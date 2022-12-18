<h1 align="center">
  Flashcard Maker
</h1>

<h2 align="center">
  Inspiration from https://quizlet.com
</h2>

## 🚀 Quick start

1.  **Config**

    Edit .env.development base on backend source https://github.com/khacsonit/gingonic
    
    Generating VAPID Keys: https://github.com/SherClockHolmes/webpush-go
    
2.  **Start**

    Navigate into your new site’s directory and start it up.
    
 
    ```shell
    cd flashcard_maker/
    npm install
    npm run develop
    ```
    
    Your site is now running at http://localhost:8000
    
3.  **Import course from Quizlet**
   
    - Open quizlet course > Three dot icon > Export > 
      + Using custom Between term and definition: 
        ```shell
        ---
        ```
      + Using custom Between rows:
        ```shell
        \n\n\n
        ```
      => Click Copy text button

    - Back to Home tab http://localhost:8000, click Import cards from clipboard > Fill name and description > Create Course
    
4.  **Setting reminder.**
    - In Reminder tab, select course, and time you want remind, remember active Active Reminder and run Scheduler in Backend.
