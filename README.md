# chrome-netflix-omdb
Google Chrome extension to display OMDB ratings on Netflix movies and shows.

## Instructions

#### 1. Download the contents
There's a green button that says Code. Click it and select Download ZIP.

#### 2. Unpack it
Extract the contents of that ZIP file into a folder of your choice.

#### 3. Enable developer mode in Chrome
1. Go to Chrome menu (to the right of user in the upper right corner) > More tools > Extensions
2. In the upper right corner of that page there is a switch to enable Developer mode. Do it!
3. Now click Load unpacked
4. Select the folder that you just unpacked. The one that contains the files of the app.
5. If it's installed, you can switch Developer mode off again. If not, repeat step 4 until you select the correct folder.

#### 4. Get key from OMDB
Visit [OMDB API key webpage](https://www.omdbapi.com/apikey.aspx), select the **FREE** option, enter your email and click submit. You'll receive the api key on the email you've provided. You **MUST** click the link in the mail to enable your API key.

*NOTE*: You can use the same key on multiple computers. Keep in mind that the key is limited to **1000 requests per day**.
*NOTE 2*: Be aware that OMDB might revoke your key at any moment. It is a free platform after all. If that happens, simply repeat the steps from the instructions.

#### 5. Add the key to the extension

Click on the extension icon (yellow box) and a popup should appear. If you can't find the icon, there's a Chrome icon that looks like u puzzle piece, so click on that and then on the app. Paste your API key to the input box and click **Save**.
#### 6. That's it!

## How to use
Simply hover over a movie or a show and the IMDB rating should appear next to the maturity rating, season count, etc...

# Motivation
Netflix & chill. Am I right? But first you have to find something to watch. And with that, the dance begins. First you find something that looks good on Netflix, then you search IMDB for that movie, then you go back because that movie sucks and you have to do it all over again! That's a step too many for me.

I've seen similar solutions on the Extension store, but they're all free, so if'm I'm not paying, that means I'm the customer. Not a concept I'm too fond of. And of course, I wanted to see if it's doable. 

The concept is to develop the app in several phases.
1. Speed coding session to get a working version in less than a working day. :heavy_check_mark:
2. Rework app so the code is written in a way it should be. :x:
3. Add additional features. :x:
- Link to IMDB page
- Display on other places than just on preview


# Copyright 
I do not own or have anything to do with any trademark mentioned in this project.

My code is published under the MIT license. Do with it what you want. Fork the project and do your modifications.