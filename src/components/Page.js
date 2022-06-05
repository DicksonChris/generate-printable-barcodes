import BarcodeLabel from "./BarcodeLabel"
import { forwardRef } from "react"

const Page = forwardRef(({ itemName, barcodeDims, pageCols, pageRows, pageDims: {pageWidth, pageHeight} }, ref) => {
    let gridTemplateColumns = '';
    for (let idx = 0; idx < pageCols; idx++) {
        gridTemplateColumns += '1fr '
    }
    const style = {
        width: "8.5in",
        height: '11in',
        maxHeight: "11in",
        display: "grid",
        overflow: "hidden",
        gridTemplateColumns
    }

    const PageContainer = () => {
        const barcodes = []
        const cellStyle = {
            display: "inline-block"
        }
        const pageItems = pageRows * pageCols
        for (let idx = 0; idx < pageItems; idx++) {
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
