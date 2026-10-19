

Directions for this frontend folder:

Synopsis:
This frontend represents the dashboard for an student assessment monitoring
system, and this system focuses on allowing professors to create courses, 
create assignments, homework, quizzes, etc within each course,
and clicking each of the above lists details + progress for each student.


FRONTEND DASHBOARD FLOW:
**Ignore access control for now, lets focus on the
greeting dashboard.

1. Profs greeted with a page, showing courses that have been added. Each course
is represented as a folder icon. Bottom right is an add button to add a new course. Clicking this add button
leads to (2)

General UI:

| Navbar (collapsible to left) | *Content view | Chatbot (collapsible to right)


2. Within the new blank course slate, there is a page with collapsible side navigation bar on the left,
together with a chatbot sidebar chat interface collapsible on the right. The navigation bar
is in a state of "editing",similar to bouncy icons that quiver. The navigation bar can be for exp:

Projects
|
assignments
|
quizzes
|
Create

--> Clicking on Projects, assignments or quizzes goes to the respective views on this same page. More on that later. Now, clicking Create goes to (3):

(3) When we click create, then users will be faced with the view that takes up the *Content view and shows:
--> Type of element to add, which can be:
    - quiz
    - assignment
    - project

--> Clicking on each type will present different fields to fill, but in general all have:
1. Desc
2. Score
3. Supporting documents
Focus on these 3 fields first located below the dropdown menu to select type.

UI Layout:
|Type dropdown       |
|Desc                |
|Score               |
|Supporting Documents|
|save draft| |confirm|

--> |save draft| button means saving the input history and this creation entry. Since the type is selected, then this entry will
appear as a draft entry under the specific category, greyed out for easy distinguishing. To save, the type MUST BE SPECIFED (FRONTEND CHECK)

--> |confirm| button means confirming the creation and this element will appear in its declared type catergory.
 
Since the entries keyed in are variable, chatbot will process the input data, and formulate into the STRUCTURED FORMAT 
that exists for each category. Hence we proceed to showing shape of structured format in (4):

4: Structured format

- Assignments:
Assignment Name 
Score
Viewable files (click = download to local desktop to view)
Description

- Projects:
Name
Checkoffs
Viewable files
Description

- quizzes
Name
Score
Description

---> **IMPT: All these data are the more verbose representation for each element pertaining to each category. When clicking on Navbar
to navigate to a particular view (ie assignments), will be greeted with this:

1. For Assignments:
| 
Assignment 1 Block
Assignment 2 Block
...
|

Where Assignment "n" block = this UI layout:
|Assignment Name|
|Brief Desc|

Same for projects and quizzes.

TECH STACK:
Use Shadcn components PURELY. Have already installed shadcn. Hence, just required to add neccesary compoenents.
Language = Typescript
Framework = React + vite 

**READ ALL OF THIS AND INTERNALISE. ONCE DONE, RUN US THROUGH THE ENTIRE UI WORKFLOW AS PRESENTED, AND WITH ASCII DIAGRAMS + HOW THEY LOOK LIKE, HOW MANY VIEWS ETC.

