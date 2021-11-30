import { svgPathToCssPolygon } from "./helpers/svgPathToCssPolygon";
import { getPathAndViewbox } from './helpers/getPathAndViewbox'
import { makePathRelative } from "./helpers/makePathRelative";

const previewPolygon = document.getElementById("preview_polygon");
const secondTitle = document.querySelector(".main_title--second");
const svgInHtml = document.getElementById("my-clip-path");

const copyPolygon = document.getElementById("copy_polygon");
const copyPolygonButton = document.getElementById("copy_polygon_button");

const copyUrl = document.getElementById("copy_url");
const copyUrlButton = document.getElementById("copy_url_button");
const copySvgButton = document.getElementById("copy_svg_button");
const copyUrlSvg = document.getElementById("copy_url_svg");

const wrong = document.querySelector(".wrong");

const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target);
    const svgFromForm = formData.get("svg");
    
    let svgPathAndViewbox;
    try {
      svgPathAndViewbox = getPathAndViewbox(svgFromForm);
      wrong.classList.remove("active");
    } catch (error) {
      wrong.classList.add("active");
    }

    const cssPolygon = svgPathToCssPolygon(svgPathAndViewbox);
    const relativePath = makePathRelative(svgPathAndViewbox);

    previewPolygon.style.clipPath = `${cssPolygon}`
    secondTitle.scrollIntoView({behavior: "smooth"});

    const pathForSvgInHtml = document.createElementNS("http://www.w3.org/2000/svg", 'path');
    pathForSvgInHtml.setAttribute('d', relativePath);
    svgInHtml.innerHTML = "";
    svgInHtml.appendChild(pathForSvgInHtml);
   
    // polygon section
    const polygonText = `clip-path: ${cssPolygon};`;
    copyPolygon.innerText = polygonText;
    copyPolygonButton.addEventListener("click", () => {
      navigator.clipboard.writeText(polygonText);
    })

    // url() section
    const svgToHtml = `<svg class="shapes">
      <clipPath id="my-clip-path" clipPathUnits="objectBoundingBox">
        <path
         d="${relativePath}"
        ></path>
      </clipPath>
    </svg>`;

    const urlText = `clip-path: url(#my-clip-path);`;
    copyUrl.innerText = urlText;
    copyUrlSvg.innerText = svgToHtml;
    copyUrlButton.addEventListener("click", () => {
      navigator.clipboard.writeText(urlText);
    })
    copySvgButton.addEventListener('click', () => {
      navigator.clipboard.writeText(svgToHtml);
    })

    console.log(relativePath);
}

window.onload = function() {
    const form = document.querySelector("form");
    form.onsubmit = handleSubmit;
}