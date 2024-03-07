
const ErrorFeedback = () => {
    return <div>Error fetching products. Please try again later or <span role="button" className="underline cursor-pointer" onClick={() => location.reload()}>Refresh here</span>.</div>
}

export default ErrorFeedback