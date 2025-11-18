export default function QueryParameters(app) {
  const calculator = (req, res) => {
    const { a, b, operation } = req.query;

    const numA = parseInt(a);
    const numB = parseInt(b);
    let result;

    switch (operation) {
      case "add":
        result = numA + numB;
        break;
      case "subtract":
        result = numA - numB;
        break;
      case "multiply":
        result = numA * numB;
        break;
      case "divide":
        if (numB === 0) {
          return res.status(400).send("Division by zero is not allowed");
        }
        result = numA / numB;
        break;
      default:
        return res.status(400).send("Invalid operation");
    }

    res.send(result.toString());
  };

  app.get("/lab5/calculator", calculator);
}
