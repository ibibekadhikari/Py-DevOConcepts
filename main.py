"""Importing FastAPI module."""
from distutils.log import error
from fastapi import FastAPI, WebSocket
from mylib.wikitool import wiki_search
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def home():
    """Home method to return value."""
    return {
        "Greet": "Hello, There.",
        "message": "This is a root page so you don't find anything here.",
        "Goto": "/wikisearch/NAME_YOU_WANT_TO_SEARCH",
    }


@app.get("/{number}")
async def get_number(number: int):
    """Returns the number given in the URL."""
    if isinstance(number, (int, float)):
        return {"Your_number_is": number}
    return {"Error": "Check your URL path and it should be string."}


@app.get("/wikisearch/{name}")
def wikisearch(name):
    name_to_search = f'"{name}"'
    searched_name, content = wiki_search(name_to_search)
    return {"name": searched_name, "content": content}


#SOCKET CODING BEGINS FROM HERE
websocket_connections = set()

@app.websocket("/app/ws")
async def websocket(websocket: WebSocket):
    print("Starting websocket with the CLIENT: ")
    await websocket.accept()
    websocket_connections.add(websocket)
    print("Websocket Connecion Established:")
    while True:
         try:
            data = await websocket.receive_text()
            print(data)
            msgtosend = "HIBOSS"
            await websocket.send_text(f"Server sending message")

         except error as e:
            print(e)
            break