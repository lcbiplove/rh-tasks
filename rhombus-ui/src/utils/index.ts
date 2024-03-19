const AvailableDataTypes = [
    "number",
    "date",
    "category",
    "text",
] 

const GetUserFriendlyTypes = (dataType: string) => {
    const mapVal: {[key: string]: string} = {
        "int64": "number",
        "int32": "number",
        "float64": "number",
        "float32": "number",
        "datetime64[ns]": "date",
        "datetime64[s]": "date",
        "category": "category",
        "object": "text",
    }
    console.log(dataType);
    return mapVal[dataType] || dataType;
};

export  {GetUserFriendlyTypes, AvailableDataTypes};