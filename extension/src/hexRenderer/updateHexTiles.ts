import { Material, Mesh, Shader } from "three";

const backgroundBlack = "rgba(0, 0, 0, 0.8)";

const PlanetPositions = [
  [],
  // 1 planet
  [
    {
      position: [160, 290],
    },
  ],
  // 2 planets
  [
    {
      position: [120, 20],
    },
    {
      position: [160, 380],
    },
  ],
  // 3 planets
  [
    {
      position: [150, 270],
    },
    {
      position: [190, 10],
    },
    {
      position: [200, 380],
    },
  ],
];
const SystemUnitPositions = [
  [256, 220],
  [256, 180],
  [256, 220],
  [256, 180],
];

export async function updateHexTiles() {
  const API = (await import(
    "https://www.twilightwars.com/js/api.js"
  )) as TiWarsApi;
  const { skeletonHexArray } = (await import(
    "https://www.twilightwars.com/js/board-creation.js"
  )) as any;
  const boardSystems = await API.getBoardSystems();
  const players = await API.getPlayers();

  const maskImage = new Image();
  maskImage.src = "data:image/png;base64," + MaskAsBase64;
  await new Promise((resolve) => {
    maskImage.onload = resolve;
  });
  boardSystems.forEach(async (boardSystem) => {
    // The Ghosts of Creuss home system is the last mesh in the array

    const systemMesh =
      boardSystem.number === 51
        ? skeletonHexArray[skeletonHexArray.length - 1]
        : skeletonHexArray[boardSystem.position];

    await updateCanvasTexture(players, boardSystem, maskImage, systemMesh);
    systemMesh.userData.boardTokens?.controlTokens.forEach(
      (controlToken: Mesh) => {
        controlToken.visible = false;
      }
    );
    systemMesh.userData.boardTokens?.infantry.forEach((infantry: Mesh) => {
      infantry.visible = false;
    });
    systemMesh.userData.boardTokens?.pds.forEach((pds: Mesh) => {
      pds.visible = false;
    });
    systemMesh.userData.boardTokens?.spaceDock.forEach((spaceDock: Mesh) => {
      spaceDock.visible = false;
    });
    systemMesh.material.map.needsUpdate = true;
    systemMesh.material.needsUpdate = true;
  });
}

const MaskAsBase64 = `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`;

async function updateCanvasTexture(
  players: Player[],
  boardSystem: BoardSystem,
  maskImage: HTMLImageElement,
  systemMesh: Mesh
) {
  const { CanvasTexture, Mesh, MeshBasicMaterial } = await import("three");
  const { createHexagonGeometry } = (await import(
    "https://www.twilightwars.com/js/utils/geometries.js"
  )) as any;
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d")!;

  const fontSize = 25;
  canvas.width = 512;
  canvas.height = 512;
  // Draw a hexagon where the top and bottom are horizontal
  const wormholeColors = {
    Alpha: "red",
    Beta: "blue",
    Delta: "green",
  };
  const ColorByFaction = players.reduce((acc, player) => {
    acc[player.faction] = player.color;
    return acc;
  }, {} as Record<string, TI4Colors>);

  // context.fillStyle = "black";
  // context.fillRect(0, 0, canvas.width, canvas.height);
  const backgroundColorsByPlayerColor = {
    red: "rgba(255, 0, 0, 1.0)",
    blue: "rgba(0, 0, 255, 1.0)",
    green: "rgba(0, 255, 0, 1.0)",
    yellow: "rgba(255, 255, 0, 1.0)",
    purple: "rgba(255, 0, 255, 1.0)",
    black: "rgba(0, 0, 0, 1.0)",
    orange: "rgba(255, 165, 0, 1.0)",
  };
  const foregroundColorsByPlayerColor: {
    [key in TI4Colors | "white"]: string;
  } = {
    red: "rgba(255, 150, 150, 1)",
    blue: "rgba(150, 150, 255, 1)",
    green: "rgba(150, 255, 150, 1)",
    yellow: "rgba(255, 255, 0, 1)",
    purple: "rgba(255, 150, 255, 1)",
    orange: "rgba(255, 150, 0, 1)",
    white: "white",
  };

  const firstUnit = boardSystem.units?.[0]!;
  const backgroundColor = firstUnit
    ? backgroundColorsByPlayerColor[firstUnit.color]
    : null;

  // Create an image from the mask
  // Draw the image in the mask fill size on the canvas in backgroundColor
  if (backgroundColor) {
    context.fillStyle = backgroundColor;
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.globalCompositeOperation = "destination-in";
    context.drawImage(
      maskImage,
      -canvas.width * 0.1,
      -canvas.height * 0.1,
      canvas.width * 1.2,
      canvas.height * 1.2
    );
    context.globalCompositeOperation = "source-over";
  }

  function writeText(
    fontSize: number,
    text: string,
    x: number,
    y: number,
    color: string = "white",
    centered = false,
    strokeColor?: string
  ) {
    context.font = `bold ${fontSize}px Arial`;
    const textWidth = context.measureText(text).width;
    const centeredX = x - textWidth / 2;
    context.fillStyle = color;
    context.fillText(text, centered ? centeredX : x, y);
    if (!strokeColor) return;
    context.strokeStyle = strokeColor;
    context.lineWidth = 2;
    context.strokeText(text, centered ? centeredX : x, y);
  }

  function drawRoundedRect(
    x: number,
    y: number,
    width: number,
    height: number,
    radius: number,
    color: string = "white"
  ) {
    context.beginPath();
    context.moveTo(x + radius, y);
    context.lineTo(x + width - radius, y);
    context.quadraticCurveTo(x + width, y, x + width, y + radius);
    context.lineTo(x + width, y + height - radius);
    context.quadraticCurveTo(
      x + width,
      y + height,
      x + width - radius,
      y + height
    );
    context.lineTo(x + radius, y + height);
    context.quadraticCurveTo(x, y + height, x, y + height - radius);
    context.lineTo(x, y + radius);
    context.quadraticCurveTo(x, y, x + radius, y);
    context.closePath();
    context.fillStyle = color;
    context.fill();
  }

  if (boardSystem.anomaly) {
    writeText(fontSize * 1.5, boardSystem.anomaly, 256, 50, "white", true);
  }

  const symbols = {
    Alpha: "🔴",
    Beta: "🔵",
    Delta: "🟢",
    Yellow: "🟡",
  };
  if (boardSystem.wormhole) {
    writeText(
      fontSize * 3.5,
      symbols[boardSystem.wormhole] ?? boardSystem.wormhole,
      256,
      500,
      wormholeColors[boardSystem.wormhole],
      true
    );
  }

  if (boardSystem.commandTokens) {
    boardSystem.commandTokens.forEach((token: string, n: number) => {
      const borderColor = ColorByFaction[token];
      context.lineWidth = 20;
      context.beginPath();
      const angle = ((2 * Math.PI) / 6) * n;
      const x1 = 256 + 226 * Math.cos(angle);
      const y1 = 256 + 266 * Math.sin(angle);
      const x2 = 256 + 226 * Math.cos(angle + (2 * Math.PI) / 6);
      const y2 = 256 + 266 * Math.sin(angle + (2 * Math.PI) / 6);
      context.moveTo(x1, y1);
      context.lineTo(x2, y2);
      context.strokeStyle = borderColor;
      context.stroke();
    });
  }

  for (let n = 0; n < 6; n++) {
    const borderColor = backgroundColor ?? "black";
    context.lineWidth = 5;
    context.beginPath();
    const angle = ((2 * Math.PI) / 6) * n;
    const x1 = 256 + 256 * Math.cos(angle);
    const y1 = 256 + 296 * Math.sin(angle);
    const x2 = 256 + 256 * Math.cos(angle + (2 * Math.PI) / 6);
    const y2 = 256 + 296 * Math.sin(angle + (2 * Math.PI) / 6);
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.strokeStyle = borderColor;
    context.stroke();
  }

  if (boardSystem.planets) {
    let n = 0;
    for (const planet of boardSystem.planets) {
      drawPlanet(planet, n++);
    }
  }

  const texture = new CanvasTexture(canvas);

  // Create a plane with the canvas texture
  const planeGeometry = createHexagonGeometry(0.9);
  const planeMaterial = new MeshBasicMaterial({ map: texture });
  const plane = new Mesh(planeGeometry, planeMaterial);
  // const x = PlanetPositions[boardSystem.planets.length][n - 1][0];
  // const y = PlanetPositions[boardSystem.planets.length][n - 1][1];
  // plane.position.set(x, y, 0.1);
  // Add the plane as a child to the system
  // systemMesh.children[0].add(plane);
  (systemMesh.material as Material).onBeforeCompile = function (
    shader: Shader
  ) {
    shader.uniforms.canvasTexture = { value: texture };

    shader.fragmentShader =
      `
        uniform sampler2D canvasTexture;
      ` + shader.fragmentShader;

    shader.fragmentShader = shader.fragmentShader.replace(
      "gl_FragColor = vec4( outgoingLight, diffuseColor.a );",
      `
        vec4 tex1Color = texture2D( map, vUv );
        vec4 canvasColor = texture2D( canvasTexture, vUv );
        gl_FragColor = vec4(canvasColor.a * canvasColor.rgb + tex1Color.rgb * (1.0 - canvasColor.a), 1.0);
        `
    );
  };

  // check if a wormhole token needs to be placed in the system
  function drawPlanet(planet: Planet, n: number) {
    const xPosition =
      PlanetPositions[boardSystem.planets.length][n].position[0];
    const yPosition =
      PlanetPositions[boardSystem.planets.length][n].position[1];
    const owningPlayer = players.find((player: Player) =>
      player.planetCards.find((card) => card.name === planet.name)
    );
    function drawPlanetUnits(
      units: Unit[],
      xPosition: number,
      yPosition: number
    ) {
      const unitColor = owningPlayer
        ? foregroundColorsByPlayerColor[owningPlayer.color]
        : "white";
      context.fillStyle = "white"; //unitColor,;
      units
        .filter((unit) => unit.name === "PDS")
        .forEach((unit, index) => {
          writeText(
            fontSize,
            "🛡",
            xPosition + 10 + index * 30,
            yPosition - 25,
            unitColor
          );
        });
      units
        .filter((unit) => unit.name === "Space Dock")
        .forEach((unit, index) => {
          writeText(
            fontSize,
            "🏗",
            xPosition + 10 + index * 30,
            yPosition,
            unitColor
          );
        });
      const hasUpgradedInfantry = units.some(
        (unit) => unit.name === "Infantry" && unit.upgraded
      );
      writeText(
        fontSize,
        `🥆${hasUpgradedInfantry ? "+" : ""}`,
        xPosition + 82,
        yPosition + 35,
        unitColor
      );
      context.font = `bold ${fontSize * 2}px Arial`;
      writeText(
        fontSize * 2,
        units.filter((unit) => unit.name === "Infantry").length.toString(),
        xPosition + 95,
        yPosition,
        unitColor,
        true
      );
    }

    const planetCard = owningPlayer
      ? owningPlayer.planetCards.find((card) => card.name === planet.name)
      : null;

    const statsText = `${planet.resources}/${planet.influence}`;
    let techColor,
      fontColor,
      techSymbol = "";
    switch (planet.tech) {
      case "Warfare":
        techColor = "red";
        techSymbol = "🔴";

        break;
      case "Biotic":
        techColor = "green";
        techSymbol = "🟢";
        break;
      case "Cybernetic":
        techColor = "yellow";
        fontColor = "white";
        techSymbol = "🟡";
        break;
      case "Propulsion":
        techColor = "blue";
        fontColor = "white";
        techSymbol = "🔵";
        break;
      default:
        techColor = null;
    }
    const blobSize = 10;
    // context.fillStyle = backgroundBlack;
    // context.fillRect(200, 0, canvas.width, canvas.height);
    context.font = `bold ${fontSize}px Arial`;
    const textWidth = context.measureText(statsText).width;
    let traitSymbol = "";
    if (textWidth > 0) {
      switch (planet.trait) {
        case "Hazardous":
          context.fillStyle = "red";
          traitSymbol = "☢️";
          break;
        case "Industrial":
          context.fillStyle = "green";
          traitSymbol = "🏭";
          break;
        case "Cultural":
          context.fillStyle = "blue";
          traitSymbol = "🎭";
          break;
        default:
          context.fillStyle = "white";
      }

      context.fillStyle = fontColor ?? "white";
      const playerColor: TI4Colors | "white" = owningPlayer
        ? ColorByFaction[owningPlayer.faction]
        : "white";
      // If planetCard is exhausted, strike through the text
      context.font = `bold ${fontSize * 2}px Arial`;
      drawRoundedRect(xPosition, yPosition, 200, 100, 10, backgroundBlack);
      if (planet.units) {
        drawPlanetUnits(planet.units, xPosition + 80, yPosition + 50);
      }
      writeText(
        fontSize * 2,
        statsText,
        xPosition + 10,
        yPosition + 50,
        foregroundColorsByPlayerColor[playerColor]
      );
      if (planetCard?.exhausted) {
        context.lineWidth = 5;
        context.beginPath();
        context.moveTo(xPosition + 25 - textWidth / 2, yPosition + 30);
        context.lineTo(xPosition + 25 + textWidth * 1.5, yPosition + 30);
        context.strokeStyle = foregroundColorsByPlayerColor[playerColor];
        context.stroke();
      }
      writeText(
        fontSize * 0.9,
        planet.name + techSymbol + traitSymbol,
        xPosition + 10,
        yPosition + 85,
        foregroundColorsByPlayerColor[playerColor]
      );
    }
  }
  if (boardSystem.units) {
    const ownerColor = boardSystem.units[0].color;
    const numberOfOwnFighters = boardSystem.units.filter(
      (unit) => unit.name === "Fighter" && unit.color === ownerColor
    ).length;
    const numberOfOwnInfantry = boardSystem.units.filter(
      (unit) => unit.name === "Infantry" && unit.color === ownerColor
    ).length;
    const numberOfEnemyFighters = boardSystem.units.filter(
      (unit) => unit.name === "Fighter" && unit.color !== ownerColor
    ).length;
    const numberOfEnemyInfantry = boardSystem.units.filter(
      (unit) => unit.name === "Infantry" && unit.color !== ownerColor
    ).length;
    context.font = `bold ${fontSize * 2}px Arial`;
    // context.fillStyle = "rgba(0, 0, 0, 0.5)";
    // context.fillRect(centerX - totalWidth / 2, y, totalWidth, fontSize * 4);
    const unitColor = boardSystem.units[0]?.color ?? "white";
    const opponentColor = boardSystem.units.find(
      (unit) => unit.color !== ownerColor
    )?.color;
    const unitStrings = ["Fi", "Fi+", "In", "In+"];
    const unitSymbols = ["🛦", "🛦+", "🥆", "🥆+"];
    const positions = [
      [90, 231, 331],
      [90, 231, 331],
      [410, 231, 331],
      [410, 231, 331],
    ];

    if (numberOfOwnFighters + numberOfOwnFighters > 0) {
      if (numberOfEnemyFighters > 0) {
        writeText(
          fontSize * 3,
          numberOfEnemyFighters.toFixed(0),
          90,
          231,
          unitColor,
          true,
          opponentColor
        );
      } else {
        writeText(fontSize * 3, `🛦`, 90, 231, unitColor, true, "white");
      }

      writeText(
        fontSize * 3,
        numberOfOwnFighters.toFixed(0),
        90,
        331,
        unitColor,
        true,
        "white"
      );
    }

    if (numberOfOwnInfantry + numberOfEnemyInfantry > 0) {
      if (numberOfEnemyInfantry > 0) {
        writeText(
          fontSize * 3,
          numberOfEnemyInfantry.toFixed(0),
          410,
          231,
          unitColor,
          true,
          opponentColor
        );
      } else {
        writeText(fontSize * 3, `🥆`, 410, 231, unitColor, true, "white");
      }
      writeText(
        fontSize * 3,
        numberOfOwnInfantry.toFixed(0),
        410,
        331,
        unitColor,
        true,
        "white"
      );
    }
  }
}
