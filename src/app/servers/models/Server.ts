import { ServerHdd } from "./ServerHdd";
import { ServerPrice } from "./ServerPrice";
import { ServerRam } from "./ServerRam";

export class Server {
    model!: String;
    ram!: ServerRam;
    hdd!: ServerHdd;
    location!: String;
    price!: ServerPrice;
}