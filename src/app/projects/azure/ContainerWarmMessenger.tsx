"use client"
import styles from "./ContainerWarmMessenger.module.css"

const ContainerWarmMessenger = () => {
    return (
        <div>
            <div className={`text-center my-16 italic text-green-700 q${styles.dots}`}>
                Warming Up Container<span>.</span><span>.</span><span>.</span>
            </div>
        </div>
    )
}

export default ContainerWarmMessenger