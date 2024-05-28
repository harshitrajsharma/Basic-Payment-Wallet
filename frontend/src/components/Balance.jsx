export const Balance = ({ value }) => {
    return <div className="flex gap-4">
        <div className="font-bold text-lg">
            Your balance
        </div>
        <div className="font-semibold text-lg">
            Rs {value}
        </div>
    </div>
}