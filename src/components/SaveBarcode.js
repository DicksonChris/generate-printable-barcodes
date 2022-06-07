import { saveSvgAsPng } from "save-svg-as-png"
import { RiSave3Fill } from "react-icons/ri"
import { useBarcode } from "./BarcodeContext"

const SaveBarcode = ({ itemName }) => {
    const contextElement = useBarcode()

    return (
        <div>
            <button
                className='btn link-danger p-0 m-0'
                onClick={() => {
                    const svg = contextElement.querySelector("svg")
                    const svgOuterHeight = parseInt(svg.getAttribute("height"), 10) + 2
                    const svgOuterWidth = parseInt(svg.getAttribute("width"), 10) + 2

                    saveSvgAsPng(svg, `${itemName}-barcode.png`, {
                        scale: 8,
                        backgroundColor: "white",

                        height: svgOuterHeight,
                        width: svgOuterWidth
                    })
                }}
            >
                <span title="Download barcode as image">
                    <RiSave3Fill size='40'/>
                </span>
            </button>
        </div>
    )
}

export default SaveBarcode
