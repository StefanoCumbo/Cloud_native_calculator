const express = require("express");
const app = express();

const add = (n1, n2) => {
    return n1 + n2;
};

const sub = (n1, n2) => {
    return n1 - n2
};

const multiply = (n1, n2) => {
    return n1 * n2;
};


const divide = (n1, n2) => {
    if (n2 === 0) {
        throw new Error("Cannot divide by zero");
    }
    return n1 / n2;
}

const sqrt = (n1) => {
    return Math.sqrt(n1)
}

const exp = (n1) => {
    return Math.exp(n1);
}

const mod = (n1, n2) => {
    return n1 % n2;
};

app.get("/mod", (req, res) => {
    try {
        const n1 = parseFloat(req.query.n1);
        const n2 = parseFloat(req.query.n2);

        if (isNaN(n1)) {
            throw new Error("n1 is incorrectly defined");
        }
        if (isNaN(n2)) {
            throw new Error("n2 is incorrectly defined");
        }

        const result = mod(n1, n2);
        res.status(200).json({ statuscode: 200, data: result });
    } catch (error) {
        res.status(500).json({ statuscode: 500, msg: error.toString() });
    }
});


app.get("/exp", (req, res) => {
    try {
        const n1 = parseFloat(req.query.n1);
        if (isNaN(n1)) {
            throw new Error("n1 is incorrectly defined");
        }

        const result = exp(n1);
        res.status(200).json({ statuscode: 200, data: result });
    } catch (error) {
        res.status(500).json({ statuscode: 500, msg: error.toString() });
    }
});


app.get("/sqrt", (req,res)=>{
    try {
        const n1 = parseFloat(req.query.n1)
        if (isNaN(n1)){
            throw new Error("n1 is incorrectly defined");

        }

        const result = sqrt(n1)
        res.status(200).json({statuscode: 200, data: result})
    
    } catch (error) {
        res.status(500).json({ statuscode: 500, msg: error.toString() });

        
    }
})



app.get("/add", (req, res) => {
    try {
        const n1 = parseFloat(req.query.n1);
        const n2 = parseFloat(req.query.n2);

        if (isNaN(n1)) {
            throw new Error("n1 is incorrectly defined");
        }
        if (isNaN(n2)) {
            throw new Error("n2 is incorrectly defined");
        }

        const result = add(n1, n2);
        res.status(200).json({ statuscode: 200, data: result });
    } catch (error) {
        console.log(error);
        res.status(500).json({ statuscode: 500, msg: error.toString() });
    }
});

app.get("/sub", (req, res) => {
    try {
        const n1 = parseFloat(req.query.n1);
        const n2 = parseFloat(req.query.n2);

        if (isNaN(n1)) {
            throw new Error("n1 is incorrectly defined");
        }
        if (isNaN(n2)) {
            throw new Error("n2 is incorrectly defined");
        }

        const result = sub(n1, n2);
        res.status(200).json({ statuscode: 200, data: result });
    } catch (error) {
        console.log(error);
        res.status(500).json({ statuscode: 500, msg: error.toString() });
    }
});

app.get("/multiply", (req, res) => {
    try {
        const n1 = parseFloat(req.query.n1);
        const n2 = parseFloat(req.query.n2);

        if (isNaN(n1)) {
            throw new Error("n1 is incorrectly defined");
        }
        if (isNaN(n2)) {
            throw new Error("n2 is incorrectly defined");
        }

        const result = multiply(n1, n2);
        res.status(200).json({ statuscode: 200, data: result });
    } catch (error) {
        console.log(error);
        res.status(500).json({ statuscode: 500, msg: error.toString() });
    }
});

app.get("/divide", (req, res) => {
    try {
        const n1 = parseFloat(req.query.n1);
        const n2 = parseFloat(req.query.n2);

        if (isNaN(n1)) {
            throw new Error("n1 is incorrectly defined");
        }
        if (isNaN(n2)) {
            throw new Error("n2 is incorrectly defined");
        }

        const result = divide(n1, n2);
        res.status(200).json({ statuscode: 200, data: result });
    } catch (error) {
        console.log(error);
        res.status(500).json({ statuscode: 500, msg: error.toString() });
    }
});


app.get("/", (req, res) => {
    res.json({
        service: "Calculator Addition Microservice",
        endpoint: "/add,  /sub, /divide, /multiply  /sqrt /exp  /mod",
        usage: "/add?n1=5&n2=3,  /sub?n1=5&n2=1,  /multiply?n1=10&n2=10, /divide?n1=50&n2=5 /sqrt?n1=81  /exp?n1=5 /mod?n1=5&n2=2 "
    });
});




const port = 3000;
app.listen(port, () => {
    console.log(`App running on port ${port}`);
});