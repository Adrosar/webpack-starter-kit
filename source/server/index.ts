import * as express from "express";
import { Request, Response } from "express";

const app = express();

app.get('/', (req: Request, res: Response) => {
    res.write('Hello World!\n');
    res.write(req.headers["user-agent"]);
    res.end();
});

app.listen(8181);