import { SinkRepair } from "./SinkRepair.js"
import { fetchRequests } from "./SinkRepair.js"


const mainContainer = document.querySelector("#container")

const render = () => {
    fetchRequests().then( () => {
        mainContainer.innerHTML = SinkRepair()
    }
    )
}

render()

