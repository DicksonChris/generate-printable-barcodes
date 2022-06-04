import Page from "./Page"
import { useReactToPrint } from "react-to-print"
import { useRef, useCallback, useState, useEffect } from "react"
import { AiFillSetting } from "react-icons/ai"
import { Row, Col, Container } from "reactstrap"
import useLocalStorage from "./useLocalStorage"

const BarcodesContainer = () => {
    const [itemName, setItemName] = useLocalStorage("item-name", "")
    const [settings, setSettings] = useLocalStorage("settings-shown", false)
    const [height, setHeight] = useLocalStorage("height", 40)
    const [textSize, setTextSize] = useLocalStorage("font-size", 9)
    const [marginX, setMarginX] = useLocalStorage("margin", 0)
    const barcodeDims = { height, textSize, marginX }

    const [pageWidth, setPageWidth] = useLocalStorage("page-width", 1)
    const [pageHeight, setPageHeight] = useLocalStorage("page-height", 1)
    const pageDims = { pageWidth, pageHeight }

    // react-to-print boilerplate
    const componentRef = useRef(null)

    const onBeforeGetContentResolve = useRef(null)

    const [loading, setLoading] = useLocalStorage("is-loading", false)
    const [text, setText] = useState("old boring text")

    const handleAfterPrint = useCallback(() => {
        console.log("`onAfterPrint` called") // tslint:disable-line no-console
    }, [])

    const handleBeforePrint = useCallback(() => {
        console.log("`onBeforePrint` called") // tslint:disable-line no-console
    }, [])

    const handleOnBeforeGetContent = useCallback(() => {
        console.log("`onBeforeGetContent` called") // tslint:disable-line no-console
        setLoading(true)
        setText("Loading new text...")

        return new Promise((resolve) => {
            onBeforeGetContentResolve.current = resolve

            setTimeout(() => {
                setLoading(false)
                setText("New, Updated Text!")
                resolve()
            }, 2000)
        })
    }, [setLoading, setText])

    const reactToPrintContent = useCallback(
        () => {
            return componentRef.current
        }, // eslint-disable-next-line
        [componentRef.current]
    )

    const handlePrint = useReactToPrint({
        content: reactToPrintContent,
        documentTitle: "Print dialog",
        onBeforeGetContent: handleOnBeforeGetContent,
        onBeforePrint: handleBeforePrint,
        onAfterPrint: handleAfterPrint,
        removeAfterPrint: true
    })

    useEffect(
        () => {
            if (
                text === "New, Updated Text!" &&
                typeof onBeforeGetContentResolve.current === "function"
            ) {
                onBeforeGetContentResolve.current()
            }
        }, // eslint-disable-next-line
        [onBeforeGetContentResolve.current, text]
    )
    return (
        <>
            <Container className='mb-2'>
                <Row>
                    <Col xs='6'>
                        <form
                            onSubmit={(event) => {
                                event.preventDefault()
                                handlePrint()
                            }}
                        >
                            <div className='input-group mb-3'>
                                <input
                                    type='text'
                                    onChange={(event) => setItemName(event.target.value)}
                                    value={itemName}
                                    autoComplete='on'
                                    className='form-control'
                                    placeholder='Item #'
                                />
                                <div className='input-group-append'>
                                    <button
                                        id='btn-print'
                                        className='btn btn-outline-primary btn-lg'
                                        type='submit'
                                    >
                                        Print
                                    </button>
                                </div>
                            </div>
                        </form>
                    </Col>
                    <Col className='d-flex align-items-start' xs='1'>
                        <AiFillSetting
                            id='settings-icon'
                            className='btn text-secondary p-0'
                            onClick={() => {
                                setSettings(!settings)
                            }}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col md='6'>
                        <Container
                            id='wh-range-selectors'
                            className={`px-0 py-4 flex-column ${settings ? "d-flex" : "d-none"}`}
                        >
                            <h2>Barcode Settings</h2>
                            <div className='d-flex align-items-center mx-2'>
                                <label
                                    htmlFor='textSizeSlider'
                                    className='form-label text-nowrap p-2 fs-5'
                                >
                                    Text Size
                                </label>
                                <input
                                    type='range'
                                    value={textSize}
                                    className='form-range'
                                    min='0'
                                    max='100'
                                    id='textSizeSlider'
                                    onChange={(event) => setTextSize(event.target.value)}
                                />
                                <span className='p-2 ms-4'>{textSize}</span>
                            </div>

                            <div className='d-flex align-items-center mx-2'>
                                <label
                                    htmlFor='heightSlider'
                                    className='form-label text-nowrap p-2 fs-5'
                                >
                                    Height
                                </label>
                                <input
                                    type='range'
                                    value={height}
                                    className='form-range'
                                    min='10'
                                    max='100'
                                    id='heightSlider'
                                    onChange={(event) => setHeight(event.target.value)}
                                />
                                <span className='p-2 ms-4'>{height}</span>
                            </div>

                            <div className='d-flex align-items-center mx-2'>
                                <label
                                    htmlFor='marginXSlider'
                                    className='form-label text-nowrap p-2 fs-5'
                                >
                                    Margin
                                </label>
                                <input
                                    type='range'
                                    value={marginX}
                                    className='form-range'
                                    min='1'
                                    max='100'
                                    id='marginXSlider'
                                    onChange={(event) => setMarginX(parseInt(event.target.value))}
                                />
                                <span className='p-2 ms-4'>{marginX}</span>
                            </div>
                        </Container>
                    </Col>
                    <Col md='6'>
                        <Container
                            id='pwh-range-selectors'
                            className={`px-0 py-4 flex-column ${settings ? "d-flex" : "d-none"}`}
                        >
                            <h2>Page Settings</h2>
                            <div className='d-flex align-items-center mx-2'>
                                <label
                                    htmlFor='pageWidthSlider'
                                    className='form-label text-nowrap p-2 fs-5'
                                >
                                    X-Axis
                                </label>
                                <input
                                    type='range'
                                    value={pageWidth}
                                    className='form-range'
                                    min='0.5'
                                    max='1'
                                    step='0.01'
                                    id='pageWidthSlider'
                                    onChange={(event) => setPageWidth(event.target.value)}
                                />
                                <span className='p-2 ms-4'>
                                    {Math.round((pageWidth * 200) / 2) * 2 - 100}
                                </span>
                            </div>
                            <div className='d-flex align-items-center mx-2'>
                                <label
                                    htmlFor='pageHeightSlider'
                                    className='form-label text-nowrap p-2 fs-5'
                                >
                                    Y-Axis
                                </label>
                                <input
                                    type='range'
                                    value={pageHeight}
                                    className='form-range'
                                    min='0.5'
                                    max='1'
                                    step='0.01'
                                    id='pageHeightSlider'
                                    onChange={(event) => setPageHeight(event.target.value)}
                                />
                                <span className='p-2 ms-4'>
                                    {Math.round((pageHeight * 200) / 2) * 2 - 100}
                                </span>
                            </div>
                            <div className='d-flex m-2'>
                                <button
                                    id='reset'
                                    className='btn btn-warning w-100'
                                    onClick={() => {
                                        setTextSize(9)
                                        setHeight(40)
                                        setMarginX(0)
                                        setPageWidth(1)
                                        setPageHeight(1)
                                    }}
                                >
                                    Reset
                                </button>
                            </div>
                        </Container>
                    </Col>
                </Row>
                <Row>
                    <Col xs='12'>{loading && <p className='indicator'>Loading...</p>}</Col>
                </Row>

                <div className='d-inline-flex' style={{ border: "gray 1px solid", height: "11in" }}>
                    <Page
                        id='print-element'
                        itemName={itemName}
                        barcodeDims={barcodeDims}
                        pageDims={pageDims}
                        ref={componentRef}
                    />
                </div>
            </Container>
        </>
    )
}
export default BarcodesContainer
