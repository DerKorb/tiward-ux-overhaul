import { parseCombats } from "./parseCombats";

let statsComponentTemplate = document.createElement("template");
statsComponentTemplate.innerHTML = `
    <style>
        table {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }

        #stats {
            position: relative;
            background-color: rgba(0, 0, 0, 0.8);
            color: white;
            border-radius: 10px;
            padding: 10px;
            display: none; /* Hide the table by default */
        }
        #stats td {
            text-align: center;
            min-width: 60px;
            font-size: 16px;
            padding: 5px;
        }
        #showButton {
            position: absolute;
            top: 15px;
            right: 778px;
            z-index: 1000;
        }
        #showButton:hover + #stats {
            display: inline-block; /* Show the table when the button is hovered */
        }
    </style>
    <button id="showButton">Show Stats</button>
    <table id="stats">
    </table>
`;

class StatsComponent extends HTMLElement {
  statsContainer: HTMLElement | null;
  showButton: HTMLElement | null;
  currentPanelIndex: number = 0; // Add a new property to keep track of the current panel
  constructor() {
    super();
    let shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.appendChild(statsComponentTemplate.content.cloneNode(true));

    this.statsContainer = this.shadowRoot!.getElementById("stats");
    this.showButton = this.shadowRoot!.getElementById("showButton");
    this.showButton!.addEventListener("wheel", (event) =>
      this.handleWheel(event)
    );
  }

  handleWheel(event: WheelEvent) {
    // Determine the direction of the scroll
    const direction = Math.sign(event.deltaY);

    // Hide the current panel
    (
      this.statsContainer!.children[this.currentPanelIndex] as HTMLElement
    ).style.display = "none";

    // Update the current panel index based on the direction of the scroll
    if (direction > 0) {
      // Scroll down: next panel
      this.currentPanelIndex =
        (this.currentPanelIndex + 1) % this.statsContainer!.children.length;
    } else {
      // Scroll up: previous panel
      this.currentPanelIndex =
        (this.currentPanelIndex - 1 + this.statsContainer!.children.length) %
        this.statsContainer!.children.length;
    }

    // Show the new current panel
    (
      this.statsContainer!.children[this.currentPanelIndex] as HTMLElement
    ).style.display = "block";
  }

  generatePanels(tradeEvents: Log[]) {
    // Add a new method to generate the panels
    const tradeMatrixPanel = document.createElement("div");
    let tradeMatrixHTML = "<h2>Trade Matrix</h2>";
    for (let tradeEvent of tradeEvents) {
      let details = tradeEvent.details.tradeRequest;
      tradeMatrixHTML += `
        <p>
          Trade from player ${details.from} to player ${details.to}:
          Offered ${details.offer.commodities} commodities for ${details.request.commodities} commodities
        </p>
      `;
    }
    tradeMatrixPanel.innerHTML = tradeMatrixHTML;
    const unitsLostPanel = document.createElement("div");
    unitsLostPanel.innerHTML = "<h2>Units Lost Chart</h2>"; // Add your units lost chart here
    const armyValuePanel = document.createElement("div");
    armyValuePanel.innerHTML = "<h2>Army Value Chart</h2>"; // Add your army value chart here

    this.statsContainer!.appendChild(tradeMatrixPanel);
    this.statsContainer!.appendChild(unitsLostPanel);
    this.statsContainer!.appendChild(armyValuePanel);

    tradeMatrixPanel.style.display = "none";
    unitsLostPanel.style.display = "none";
    armyValuePanel.style.display = "none";

    tradeMatrixPanel.style.display = "block";
  }

  async connectedCallback() {
    const API = (await import(
      "https://www.twilightwars.com/js/api.js"
    )) as TiWarsApi;
    const game = await API.getGame();

    const dbRequest = indexedDB.open("TiWarsDB", 1);

    dbRequest.onupgradeneeded = function (event) {
      const db = (event.target as IDBOpenDBRequest).result;
      const logsStore = db.createObjectStore("logs", { keyPath: "_id" });
      logsStore.createIndex("time", "time", { unique: false });
    };

    dbRequest.onsuccess = async (event) => {
      const db = (event.target as IDBOpenDBRequest).result;

      let lastLogId = undefined;
      while (true) {
        const mostRecentLogs: Log[] = await API.getGameLogs(lastLogId);
        if (mostRecentLogs.length === 0) {
          break;
        }

        let allLogsExistInDB = true;
        const transaction = db.transaction(["logs"], "readwrite");
        const logsStore = transaction.objectStore("logs");
        for (const log of mostRecentLogs) {
          const request = logsStore.get(log._id);
          await new Promise((resolve, reject) => {
            request.onsuccess = function (event) {
              if (!request.result) {
                logsStore.add(log);
                allLogsExistInDB = false;
              }
              resolve(null);
            };
            request.onerror = function (event) {
              reject(new Error("Error accessing the indexedDB"));
            };
          });
          lastLogId = log._id;
        }

        if (allLogsExistInDB) {
          break;
        }
      }

      const transaction = db.transaction(["logs"], "readonly");
      const logsStore = transaction.objectStore("logs");
      const gameLogsRequest = logsStore.getAll();
      const gameLogs: Log[] = await new Promise((resolve, reject) => {
        gameLogsRequest.onsuccess = function (event) {
          resolve(
            gameLogsRequest.result.filter((log) => log.game === game._id)
          );
        };
        gameLogsRequest.onerror = function (event) {
          reject(new Error("Error accessing the indexedDB"));
        };
      });
      parseCombats(gameLogs);
      const groupedLogs = gameLogs.reduce((grouped, log) => {
        if (log.game === game._id) {
          if (!grouped[log.event]) {
            grouped[log.event] = [];
          }
          grouped[log.event].push(log);
        }
        return grouped;
      }, {} as { [event: string]: Log[] });
      (window as any).events = groupedLogs;

      let tradeEvents: Log[] = gameLogs.filter(
        (log) => log.event === "trade request accepted"
      );
      this.generatePanels(tradeEvents); // Call the new method after the stats container is initialized
    };

    dbRequest.onerror = function (event) {
      console.log("Error opening/accessing the indexedDB");
    };
  }
}

window.customElements.define("ti-stats-component", StatsComponent);
