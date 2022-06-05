const Loading = ({ loading }) => {
    return (
        <div>
            {loading && (
                <div className='loading-overlay d-flex align-items-center justify-content-center'>
                    <div className='lds-default'>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Loading
