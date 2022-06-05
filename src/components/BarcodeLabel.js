import Barcode from "react-jsbarcode"

const BarcodeLabel = ({ itemName, barcodeDims: { height, textSize, marginX } }) => {
    const value = itemName
    const options = {
        width: 1,
        height,
        displayValue: true,
        margin: 0,
        marginLeft: marginX,
        marginRight: marginX,
        textAlign: "center",
        textMargin: 0,
        fontSize: textSize,
        font: "sans-serif"
    }
    const wrapperStyle = {
        border: "white 2px solid",
        backgroundColor: "white",
        height: "100%",
        minWidth: 0,
        minHeight: 0,
        display: "flex",
        flexDirection: "row",
        flex: "1 1 auto"
    }

    return (
        <div style={wrapperStyle}>
            {value ? (
                <Barcode value={value} options={options} />
            ) : (
                <span className='text-center w-100 align-self-center'>Input item #</span>
            )}
        </div>
    )
}
export default BarcodeLabel
