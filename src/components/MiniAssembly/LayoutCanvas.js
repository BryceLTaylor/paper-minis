import {
  useState,
  useEffect,
  useContext,
  useRef,
  useLayoutEffect,
} from "react";

import printContext from "../../printContext.js";
import missingImage from "../../../images/missing.png";

import "./MiniAssembly.css";

import {
  getCreatureImageByName,
  getCreatureImageById,
} from "../../dataGetter.js";

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
  const [printing, setPrinting] = useState(false);
  const printCanvasRef = useRef(null);

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
    let imageDimensions = { x: 100, y: 100 };

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
    drawOffScreen(offCanvas, canvas);
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
    const onScreenContext = onCanvas.getContext("2d");
    // const offScreenContext = offCanvas.getContext("2d");
    console.log(onScreenContext.canvas);
    onScreenContext.drawImage(
      offCanvas,
      0,
      0,
      offCanvas.width,
      offCanvas.height,
      0,
      0,
      onCanvas.width,
      onCanvas.height
    );
  }

  useEffect(() => {
    drawMinis();
  }, [imagesLoaded, printList]);

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

  function printMinis() {
    console.log(`print miniatures`);
    console.log(offCanvas);
    // window.print();
    // console.log(dataUrl);
    setPrinting(true);

    let frameObj = document.getElementById("printFrame");
    console.log(frameObj);

    let frameContent = frameObj.contentWindow.document.body;
    let printingCanvas = document.createElement("canvas");
    printingCanvas.style.width = "2400";
    printingCanvas.style.height = "3300";
    printingCanvas.removeAttribute("hidden");
    ctx = printingCanvas.getContext("2d");
    ctx.drawImage(
      offCanvas,
      0,
      0,
      offCanvas.width,
      offCanvas.height,
      0,
      0,
      printingCanvas.width,
      printingCanvas.height
    );

    frameContent.appendChild(printingCanvas);
    // frameContent.contentWindow.print();

    let frame = document.getElementById("printFrame");
    let win = frame.contentWindow;
    console.log(frame);

    win.print();
    // frameContent.print();

    // let frame = printCanvasRef.current;
    // let printCanvas = frame.createElement("canvas");
  }

  function printCanvas() {
    var dataUrl = offCanvas.toDataURL("image/png", 1.0); //attempt to save base64 string to server using this var
    var windowContent = "<!DOCTYPE html>";
    windowContent += "<html>";
    windowContent += "<head><title>Print canvas</title></head>";
    windowContent += "<body>";
    windowContent += '<img src="' + dataUrl + '">';
    windowContent += "</body>";
    windowContent += "</html>";
    var printWin = window.open("", "", "width=340,height=260");
    printWin.document.open();
    printWin.document.write(windowContent);
    printWin.document.close();
    printWin.focus();
    printWin.print();
    printWin.close();
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
      <iframe ref={iFrameRef} id="printFrame" hidden="hidden"></iframe>
      {/* {printing ? (
        <iframe ref={iFrameRef} id="printFrame" hidden="hidden"></iframe>
      ) : null} */}
    </div>
  );
};

export default LayoutCanvas;
