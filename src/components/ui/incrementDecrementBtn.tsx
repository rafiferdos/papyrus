import { useState } from "react";
import { FiMinus, FiPlus } from "react-icons/fi";

export default function IncrementDecrementBtn() {
    const [count, setCount] = useState(0);

    const handleIncrement = () => {
        setCount(count + 1)
    }
    const handleDecrement = () => {
        if (count > 0) {
            setCount(count - 1)
        }
    }
    return (
        <div className="flex justify-center items-center gap-5 border-2 rounded-full px-2 py-1 text-[#1A1A1A]">
            <button className="p-3 rounded-full bg-[#F2F2F2]" onClick={handleDecrement}>
                <FiMinus />
            </button>

            <p>{count}</p>

            <button className="p-3 rounded-full bg-[#F2F2F2]" onClick={handleIncrement}>
                <FiPlus />
            </button>

        </div>
    );
}