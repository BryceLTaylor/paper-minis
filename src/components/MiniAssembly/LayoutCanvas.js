import {
  useState,
  useEffect,
  useContext,
  useRef,
  useLayoutEffect,
} from "react";

import printContext from "../../printContext.js";
import missingImage from "../../../images/missing.png";

import printCanvasHTML from "./printCanvas.html";

import "./MiniAssembly.css";

import { getCreatureImageById } from "../../dataGetter.js";

const LayoutCanvas = (props) => {
  const [printList] = useContext(printContext);
  const [imageList, setImageList] = useState(new Map());
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const [printCanvasWidth, setPrintCanvasWidth] = useState(0);
  const [printCanvasHeight, setPrintCanvasHeight] = useState(0);

  useLayoutEffect(() => {
    setPrintCanvasWidth(spanRef.current.offsetWidth);
    setPrintCanvasHeight((spanRef.current.offsetWidth * 11) / 8.5);
  }, []);

  imageList.set("missing", missingImage);

  const offCanvas = new OffscreenCanvas(2400, 3300);

  getImages();

  const canvasRef = useRef(null);
  const spanRef = useRef(null);

  const iFrameRef = useRef(null);
  const [iFrameLoaded, setIFrameLoaded] = useState(false);

  let lineOffset = 3;

  async function drawMinis() {
    const canvas = canvasRef.current; //onscreen canvas only
    const context = offCanvas.getContext("2d");
    context.fillStyle = "#FFFFFF";
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);

    let pixelsPerInch = 300;
    let margin = 0.5;
    let marginPixels = margin * pixelsPerInch;

    let miniLocation = { x: marginPixels, y: marginPixels };

    await printList.creatures.map(async (creature) => {
      let creatureSize = creature.creatureInfo.size;
      for (let i = 0; i < creature.count; i++) {
        let baseSize, standHeight;
        switch (creatureSize) {
          case "large":
            baseSize = 2;
            standHeight = 2.5;
            break;
          case "huge":
            baseSize = 3;
            standHeight = 4;
            break;
          case "medium":
            baseSize = 1;
            standHeight = 1.5;
            break;
          case "small":
            baseSize = 1;
            standHeight = 1.5; // later maybe make this smaller
          default:
            baseSize = 1;
            standHeight = 1.5;
            break;
        }
        let miniDimensions = {
          x: baseSize * pixelsPerInch,
          y: (baseSize * 2 + standHeight * 2) * pixelsPerInch,
        };

        drawMini(
          context,
          creature.id,
          miniLocation.x,
          miniLocation.y,
          baseSize * pixelsPerInch, // imageWidth
          baseSize * pixelsPerInch, // imageHeight
          baseSize * pixelsPerInch,
          standHeight * pixelsPerInch
        );
        miniLocation.x += miniDimensions.x;
        if (
          miniLocation.x + miniDimensions.x >
          context.canvas.width - marginPixels
        ) {
          miniLocation.x = marginPixels;
          miniLocation.y += miniDimensions.y;
        }
      }
    });

    await drawOffScreen(offCanvas, canvas);
    let printingCanvas = await getPrintCanvas();
    console.log(printingCanvas);
    if (printingCanvas != null) {
      await drawOffScreen(offCanvas, printingCanvas);
    }
  }

  async function drawMini(
    context,
    imageId,
    startX,
    startY,
    imageWidth,
    imageHeight,
    baseSize,
    standHeight
  ) {
    let frontImage = await document.getElementById(`hiddenImage${imageId}`);

    let dashes = [10, 10];
    if (frontImage) {
      context.setLineDash([]);
      context.lineWidth = 5;

      context.beginPath();
      //top line
      context.moveTo(startX, startY);
      context.lineTo(startX + baseSize, startY);

      // right line
      context.lineTo(
        startX + baseSize,
        startY + (2 * baseSize + 2 * standHeight)
      );
      // bottom line
      context.lineTo(startX, startY + (2 * baseSize + 2 * standHeight));
      //left line
      context.lineTo(startX, startY);
      context.stroke();

      //horizontal lines
      context.beginPath();
      context.setLineDash(dashes);
      context.moveTo(startX, startY + 0.5 * baseSize);
      context.lineTo(startX + baseSize, startY + 0.5 * baseSize);
      context.stroke();
      context.setLineDash([]);

      context.setLineDash(dashes);
      context.moveTo(startX, startY + 0.5 * baseSize + standHeight);
      context.lineTo(startX + baseSize, startY + 0.5 * baseSize + standHeight);

      context.moveTo(startX, startY + 0.5 * baseSize + 2 * standHeight);
      context.lineTo(
        startX + baseSize,
        startY + 0.5 * baseSize + 2 * standHeight
      );

      context.moveTo(startX, startY + baseSize + 2 * standHeight);
      context.lineTo(startX + baseSize, startY + baseSize + 2 * standHeight);

      context.stroke();

      context.setLineDash([]);

      //draw upside down image
      context.save();
      context.translate(
        startX + imageWidth / 2,
        startY +
          imageHeight / 2 +
          baseSize / 2 +
          (standHeight - imageHeight) / 2
      );
      context.rotate(Math.PI);
      context.translate(
        -(startX + imageWidth / 2),
        -(
          startY +
          imageHeight / 2 +
          baseSize / 2 +
          (standHeight - imageHeight) / 2
        )
      );
      context.drawImage(
        frontImage,
        startX + lineOffset,
        startY + 0.5 * baseSize + (standHeight - imageHeight) / 2,
        imageWidth - lineOffset * 2,
        imageHeight
      );
      context.rotate(-Math.PI);
      context.restore();

      //draw right side up image
      context.drawImage(
        frontImage,
        startX + lineOffset,
        startY + 0.5 * baseSize + standHeight + (standHeight - imageHeight) / 2,
        imageWidth - lineOffset * 2,
        imageHeight
      );
    }
  }

  async function drawOffScreen(offCanvas, onCanvas) {
    console.log(onCanvas);

    const onScreenContext = await onCanvas.getContext("2d");
    onScreenContext
      ? onScreenContext.drawImage(
          offCanvas,
          0,
          0,
          offCanvas.width,
          offCanvas.height,
          0,
          0,
          onCanvas.width,
          onCanvas.height
        )
      : null;
  }

  useEffect(() => {
    drawMinis();
  }, [imagesLoaded, printList, iFrameLoaded]);

  let frame = iFrameRef.current;
  useEffect(() => {
    frame?.addEventListener("load", () => {
      setIFrameLoaded(true);

      return () => {
        frame?.addEventListener("load", () => setIFrameLoaded(true));
      };
    });
  }, [frame]);

  async function getImages() {
    await printList.creatures.map(async (creature) => {
      if (!imageList.has(creature.id)) {
        await setImageList(
          new Map(
            await imageList.set(
              creature.id,
              await getCreatureImageById(creature.id)
            )
          )
        );
      }
    });
    setImagesLoaded(true);
  }

  async function printMinis() {
    console.log(`print miniatures`);

    let frameObj = await document.getElementById("printFrame");
    let win = frameObj.contentWindow;

    win.focus();
    win.print();
  }

  async function getPrintCanvas() {
    let frameObj = await document.getElementById("printFrame");
    let frameDoc = frameObj.contentWindow.document;
    let printingCanvas = await frameDoc.getElementById("printCanvas");
    return printingCanvas;
  }

  /* full size is 2400 x 3300 */

  return (
    <div>
      <p>Mini Assembly</p>
      <button onClick={printMinis}>Print</button>
      <span width="100%" ref={spanRef}>
        {imagesLoaded
          ? [...imageList.keys()].map((creatureImage) => (
              <img
                src={imageList.get(creatureImage)}
                id={`hiddenImage${creatureImage}`}
                key={creatureImage}
                hidden="hidden"
              />
            ))
          : null}
        <canvas
          ref={canvasRef}
          id="workTable"
          className="mini-canvas"
          width={printCanvasWidth}
          height={printCanvasHeight}
        />
      </span>
      <iframe
        ref={iFrameRef}
        id="printFrame"
        width="2400"
        size="2400px 3300px;"
        src={printCanvasHTML}
        hidden="hidden"
      ></iframe>
    </div>
  );
};

export default LayoutCanvas;
