import { AiFillInfoCircle } from "react-icons/ai"

const Alert = ({ show, alertText }) => {
    return (
        <div>
            <div className='relative fs-6'>
                {true ? (
                    <div role='alert' className={`alert alert-warning p-2 ${show || "hidden"}`}>
                        <div>
                            <AiFillInfoCircle className='fill-info' />{" "}
                            <span>{alertText}</span>
                        </div>
                    </div>
                ) : (
                    <div></div>
                )}
            </div>
        </div>
    )
}

export default Alert
