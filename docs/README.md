# <PROJECT NAME HERE>

Welcome to our project! Our aim is to empower people to share legal documents and knowledge. The <project name> extracts the text and meta-data from documents and saves everything as structured data. This allows for more exact searching, easier interaction and freedom format the text in any way the user desires. 

We want to make it possible for anyone to host law. To ensure scalability and avoid redundancy we aim for federation between instances of <our product>. An instance dedicated to European law should be able to benefit from an important judgment on European asylum law uploaded from an instance dedicated to migration law. We want to achieve this by using an event-driven architecture, powered by Apache Kafka. 


# Process

1. A user has a link to a legal text he wishes to upload.
2. The user provides the link and the type of text to the application.
3. The application downloads the text 
4. The application separates the text into meta-data enriched paragraphs.
5. An event is fired for each enriched paragraph.
6. A consumer listens to upload events and inserts them into a PostgreSQL database.




