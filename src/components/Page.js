import BarcodeLabel from "./BarcodeLabel"
import { forwardRef } from "react"

const Page = forwardRef(({ itemName, barcodeDims, pageDims: {pageWidth, pageHeight} }, ref) => {
    const style = {
        width: "8.5in",
        height: '11in',
        maxHeight: "11in",
        display: "grid",
        overflow: "hidden",
        gridTemplateColumns: "1fr 1fr 1fr" 
    }

    console.log(style.marginRight)

    const PageContainer = () => {
        const barcodes = []
        const cellStyle = {
            display: "inline-block"
        }
        for (let idx = 0; idx < 30; idx++) {
            barcodes.push(
                <BarcodeLabel
                    style={cellStyle}
                    itemName={itemName}
                    key={`cell-${idx}`}
                    barcodeDims={barcodeDims}
                />
            )
        }
        return <div style={style}>{barcodes}</div>
    }

    return (
        <div ref={ref} style={{ transform: `scaleX(${pageWidth}) scaleY(${pageHeight})` }}>
            <PageContainer />
        </div>
    )
})

export default Page
