import { useCallback, useRef, useState } from 'react'
import { isMobile } from 'react-device-detect'
import { AiFillPrinter, AiFillSetting } from 'react-icons/ai'
import { useReactToPrint } from 'react-to-print'
import { Col, Container, Row } from 'reactstrap'
import timeout from '../utils/timeout'
import Alert from './Alert'
import Page from './Page'
import SaveBarcode from './SaveBarcode'
import useLocalStorage from '../hooks/useLocalStorage'

const BarcodesContainer = ({ setLoading }) => {
  const [itemName, setItemName] = useLocalStorage('item-name', '')
  const [settings, setSettings] = useLocalStorage('settings-shown', false)
  const [height, setHeight] = useLocalStorage('height', 40)
  const [textSize, setTextSize] = useLocalStorage('font-size', 9)
  const [marginX, setMarginX] = useLocalStorage('margin', 0)
  const [alertText, setAlertText] = useState('')
  const [showAlert, setShowAlert] = useState(false)
  const barcodeDims = { height, textSize, marginX }

  const [pageWidth, setPageWidth] = useLocalStorage('page-width', 1)
  const [pageHeight, setPageHeight] = useLocalStorage('page-height', 1)
  const pageDims = { pageWidth, pageHeight }
  const [pageCols, setPageCols] = useLocalStorage('page-columns', 3)
  const [pageRows, setPageRows] = useLocalStorage('page-rows', 10)

  // react-to-print boilerplate
  const componentRef = useRef()
  const onBeforeGetContentResolve = useRef(null)

  const handleOnBeforeGetContent = useCallback(() => {
    setLoading(true)

    return new Promise((resolve) => {
      onBeforeGetContentResolve.current = resolve

      setTimeout(() => {
        setLoading(false)
        resolve()
      }, 2000)
    })
  }, [setLoading])

  const reactToPrintContent = useCallback(
    () => {
      return componentRef.current
    }, // eslint-disable-next-line
    [componentRef.current]
  )

  const handlePrint = useReactToPrint({
    content: reactToPrintContent,
    documentTitle: 'Print dialog | Barcode Generator',
    onBeforeGetContent: handleOnBeforeGetContent,
    removeAfterPrint: true,
  })

  return (
    <>
      <Container
        fluid
        className='main-container bg-light shadow d-print-none'
        style={{ marginBottom: '2rem' }}
      >
        <Container className='mb-2'>
          <Row>
            <Col xs='10' className='pe-0'>
              <form
                onSubmit={(event) => {
                  event.preventDefault()
                  // Check if input is empty
                  if (timeout(itemName, setShowAlert, setAlertText)) {
                    return
                  }

                  if (isMobile) {
                    window.print()
                    return
                  }
                  handlePrint()
                }}
              >
                <div className='input-group mb-3'>
                  <input
                    type='text'
                    onChange={(event) => {
                      const text = event.target.value

                      // Validate input
                      const pattern = /^[\x20-\x7E]*$/
                      if (!text.match(pattern)) {
                        setShowAlert(true)
                        setAlertText(`Barcode must only contain valid Code 128 B characters`)
                        setTimeout(() => {
                          setShowAlert(false)
                        }, 10000)
                        return
                      } else if (text.length > 48) {
                        setShowAlert(true)
                        setAlertText(`Barcode cannot be longer than 48 characters`)
                        return
                      } else {
                        setItemName(text)
                      }

                      // Check if the text starts with a space
                      if (text.charAt(0) === ' ') {
                        setAlertText('Barcode should not START with a space')
                        return
                      }

                      // Check if the text ends with a space
                      if (text.charAt(text.length - 1) === ' ') {
                        setShowAlert(true)
                        setAlertText(`Barcode should not END with a space`)
                        return
                      }

                      setShowAlert(false)
                    }}
                    value={itemName}
                    autoComplete='on'
                    className='form-control'
                    placeholder='Barcode text...'
                  />
                  <div className='input-group-append'>
                    <button id='btn-print' className='btn btn-outline-primary btn-lg' type='submit'>
                      <AiFillPrinter /> Print
                    </button>
                  </div>
                </div>
              </form>
            </Col>
            <Col className='d-flex align-items-start ps-0' xs='2'>
              <AiFillSetting
                id='settings-icon'
                className='btn link-secondary p-0 m-0'
                flex='1'
                onClick={() => {
                  setSettings(!settings)
                }}
                title='Open settings menu'
              />
              <SaveBarcode
                itemName={itemName}
                flex='1'
                setShowAlert={setShowAlert}
                setAlertText={setAlertText}
              />
            </Col>
          </Row>
          <Row className='m-0 p-0'>
            <Col className='m-0 p-0'>
              <Alert show={showAlert} alertText={alertText} />
            </Col>
          </Row>

          <Row>
            <Col md='6'>
              <Container
                id='wh-range-selectors'
                className={`px-0 pb-4 flex-column ${settings ? 'd-flex' : 'd-none'}`}
              >
                <h2>Barcode Settings</h2>
                <div className='d-flex align-items-center mx-2'>
                  <label htmlFor='textSizeSlider' className='form-label text-nowrap mw-name fs-5'>
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
                  <span className='p-2 mw-val'>{textSize}</span>
                </div>
                <div className='d-flex align-items-center mx-2'>
                  <label htmlFor='heightSlider' className='form-label text-nowrap mw-name fs-5'>
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
                  <span className='p-2 mw-val'>{height}</span>
                </div>
                <div className='d-flex align-items-center mx-2'>
                  <label htmlFor='marginXSlider' className='form-label text-nowrap mw-name fs-5'>
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
                  <span className='p-2 mw-val'>{marginX}</span>
                </div>
              </Container>
            </Col>
            <Col md='6'>
              <Container
                id='pwh-range-selectors'
                className={`px-0 pb-4 flex-column ${settings ? 'd-flex' : 'd-none'}`}
              >
                <h2>Page Settings</h2>

                <div className='d-flex align-items-center mx-2'>
                  <label htmlFor='pageColsSlider' className='form-label text-nowrap mw-name fs-5'>
                    Columns
                  </label>
                  <input
                    type='range'
                    value={pageCols}
                    className='form-range'
                    min='1'
                    max='6'
                    id='pageColsSlider'
                    onChange={(event) => setPageCols(event.target.value)}
                  />
                  <span className='p-2 mw-val'>{pageCols}</span>
                </div>

                <div className='d-flex align-items-center mx-2'>
                  <label htmlFor='pageRowsSlider' className='form-label text-nowrap mw-name fs-5'>
                    Rows
                  </label>
                  <input
                    type='range'
                    value={pageRows}
                    className='form-range'
                    min='1'
                    max='12'
                    id='pageRowsSlider'
                    onChange={(event) => {
                      setPageRows(event.target.value)
                    }}
                  />
                  <span className='p-2 mw-val'>{pageRows}</span>
                </div>

                <div className='d-flex align-items-center mx-2'>
                  <label htmlFor='pageWidthSlider' className='form-label text-nowrap mw-name fs-5'>
                    X-Margin
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
                  <span className='p-2 mw-val'>{Math.round((pageWidth * 200) / 2) * 2 - 100}</span>
                </div>

                <div className='d-flex align-items-center mx-2'>
                  <label htmlFor='pageHeightSlider' className='form-label text-nowrap mw-name fs-5'>
                    Y-Margin
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
                  <span className='p-2 mw-val'>{Math.round((pageHeight * 200) / 2) * 2 - 100}</span>
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
                      setPageCols(3)
                      setPageRows(10)
                    }}
                  >
                    Reset
                  </button>
                </div>
              </Container>
            </Col>
          </Row>
        </Container>
      </Container>
      <div
        className='d-grid'
        id='preview-gray-outer-area'
        style={{
          placeItems: 'center',
          backgroundColor: 'lightgray',
          width: '100vw',
          overflowX: 'hidden',
        }}
      >
        <div
          className='d-inline-flex'
          id='preview-border-area'
          style={{
            backgroundColor: 'lightgray',
            height: 'fitContent',
            borderTop: 'dimgray 3px solid',
            borderRight: 'dimgray 4px solid',
            borderBottom: 'dimgray 4px solid',
            borderLeft: 'dimgray 3px solid',
            marginBottom: '4rem',
            overflowX: 'hidden',
          }}
        >
          <div
            className='d-inline-flex justify-content-center'
            id='pass-through-bg'
            style={{
              height: '11in',
              width: '8.5in',
              backgroundColor: '#eeeeee',
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23aaa6af' fill-opacity='0.4'%3E%3Cpath d='M0 38.59l2.83-2.83 1.41 1.41L1.41 40H0v-1.41zM0 1.4l2.83 2.83 1.41-1.41L1.41 0H0v1.41zM38.59 40l-2.83-2.83 1.41-1.41L40 38.59V40h-1.41zM40 1.41l-2.83 2.83-1.41-1.41L38.59 0H40v1.41zM20 18.6l2.83-2.83 1.41 1.41L21.41 20l2.83 2.83-1.41 1.41L20 21.41l-2.83 2.83-1.41-1.41L18.59 20l-2.83-2.83 1.41-1.41L20 18.59z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          >
            {!itemName ? (
              <div
                className='d-flex'
                style={{ width: '8.5in', height: '11', backgroundColor: 'white' }}
              >
                <div
                  className='text-center align-self-center'
                  style={{
                    width: '8.5in',
                    height: '11',
                    backgroundColor: 'white',
                  }}
                ></div>
              </div>
            ) : (
              <Page
                id='print-element'
                itemName={itemName}
                barcodeDims={barcodeDims}
                pageDims={pageDims}
                pageRows={pageRows}
                pageCols={pageCols}
                ref={componentRef}
              />
            )}
          </div>
        </div>
      </div>
    </>
  )
}
export default BarcodesContainer
