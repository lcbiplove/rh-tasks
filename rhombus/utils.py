
from datetime import datetime

def get_error_response(code: int, messsage: dict, path: str):
    return {
        "status": "error", 
        "statusCode": code,
        "error": {
            "message": messsage,
            "timestamp": datetime.now().isoformat(),
            "path": path,
        },
    }

def get_success_response(data: dict):
    return {
        "status": "success", 
        "data": data,
    }