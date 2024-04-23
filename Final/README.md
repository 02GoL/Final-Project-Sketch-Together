# CSCI 2020U Final Project - Sketch Together

## Project Information
Sketch Together is a drawing server application where multiple rooms can be created and other users can join these rooms so that all 
the members of a room can draw on the same canvas. Some features include being able to have multiple clients in the 
same room drawing together, obtaining updates of people leaving and joining your room, and downloading the drawing.

A video demo can be found [here](https://youtu.be/9elLYiGNtck): 

[![Youtube Thumbnail](https://img.youtube.com/vi/9elLYiGNtck/0.jpg)](https://www.youtube.com/watch?v=9elLYiGNtck)

Authors: Charis Chan, Beatriz Provido, Gordon Law, Jerico Robles

## How to Run
### Step 1: Obtain the repository link
>`Go to the following Github website page: ` https<nolink>://github.com/OntarioTech-CS-program/w24-csci2020u-final-project-chan-provido-robles-law

![step1.png](screenshots/step1.png)

>`Click on the code dropdown to obtain and copy the https:// link to access the repository.`

### Step 2: Clone the repository locally
>`Next, open IntelliJ and click on 'Get from VCS'.`

![step2.png](screenshots/step2.png)

>`Then, paste the URL into the URL input box and choose the desired directory to clone your repository into. Click clone when you're satisfied.`

### Step 3: Set up the project in IntelliJ
>`Once the project opens, go to the run menu and click 'Edit Configurations'`

![step3.png](screenshots/step3.png)

### Step 4: Set Configurations

>`Choose 'Add New Configuration' (the '+' symbol) located inside the configuration menu, and select 'GlassFish Server => Local'`

![step4.png](screenshots/step4.png)

>`Change the name to 'GlassFish 7.0.9 Local'. Configure 'JRE' with JDK version 21. Fill in the 'URL' with `ws://localhost:8080/FinalProject-1.0-SNAPSHOT/ws` and 'Server Domain' with domain1 like in the screenshot below:`

![step5.png](screenshots/step5.png)

>`Next, go to the 'Deployment' tab and choose 'Artifact', followed by selecting 'FinalProject:war exploded'. Click 'Apply' then 'OK'`

![step6.png](screenshots/step6.png)

### Step 5: API Configurations
>`After setting up the websocket, we have to set up the API.
> Repeat step 3 and choose Add New Configuration' (the '+' symbol) located inside the configuration menu.`

![step3.png](screenshots/step3.png)
![step8.png](screenshots/step8.png)

>`Select 'GlassFish Server => Remote'`

![step9.png](screenshots/step9.png)

>`Change the name to 'GlassFish 7.0.9 Remote'. Fill in the 'URL' with ` http<nolink>://localhost:8080/FinalProject-1.0-SNAPSHOT/api/history

![step10.png](screenshots/step10.png)

>`Go to the 'Deployment' tab and choose 'Artifact', followed by selecting 'FinalProject:war'. Click 'Apply' then 'OK'`

![step11.png](screenshots/step11.png)

### Step 6: Deploy

> `Click on the dropdown menu to the left of the green play button at the top and select 'GlassFish 7.0.9' Local and click the play button.`

![step12.png](screenshots/step12.png)

> `Next, click on the dropdown menu again and select 'GlassFish 7.0.9 Remote' and click the play button`

![step13.png](screenshots/step13.png)

> `Lastly, right click the 'index.html' file from the file list on the left and click "Run 'index.html' "`

![step14.png](screenshots/step14.png)


## Resources
> Downloading the image: https<nolink>://fjolt.com/article/html-canvas-save-as-image
> 
> Professor Hrim's restApi related files
> - DrawingArchiveApplication
> - DrawingArchiveResource
> - DrawingAPIHandler
> - FileReaderWriter

## Contribution
> Equal contribution