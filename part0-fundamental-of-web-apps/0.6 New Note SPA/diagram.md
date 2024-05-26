```mermaid
sequenceDiagram
    participant browser
    participant server

    Note right of browser: Captures form data and redraws the notes locally
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server-->>browser: RESPONSE 201 Created
    deactivate server
```
