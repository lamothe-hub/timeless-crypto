# Timeless
Get paid in real-time. Stream your earnings through the interledger.

## Inspiration
We believe Timeless has serious potential to reinvent the way people are compensated for work. We were inspired by the cutting-edge tech presented and we immediately had a few "ah ha!" moments about how it could be applied in creative ways. It wasn't just that the tech was cool, we actually found that this was something we could use to develop something incredibly useful and that would dramatically improve people's' lives. Working on this project, we were especially motivated by the belief that we could make a difference in the motivation-levels and success of people and reframe the way they think about payments.
 
## Problem statement
Traditionally, employees have been paid in biweekly lump sums. While this may be convenient for employers and their book keepers, the system poses innumerable inconveniences and hardships for the employee. Here are some of the big issues which we set out to address:
 
-Employees who are living paycheck-to-paycheck (which 78% of Americans according to a quick Google search) often find themselves strained for cash toward the end of the pay cycle. If a big deadline for rent or a car payment is due, the rigid timing of “pay day” may cause shortages of cash at unfortunate times.

-There is lack of instant gratification for completed work. Sure at the end of two weeks it feels good to receive a big paycheck, but we think it would both feel better and be more motivating to be able to pull out your phone while you are at work and watch your bank account grow in real time as you are instantly compensated for your work.

-The employee is subject to risk. The employee essentially racks up an “iou” throughout the pay cycle. In this limbo state when the employee is owed money, things can happen that would delay or prevent the employee from receiving the compensation they are owed. For example, companies can go out of business, employees may be subject to abusive employers who withhold wages, etc. This risk is more pronounced for people with longer pay cycles and those with dire financial circumstances (missing one payment could make a big difference).

-Trust is perhaps an even more glaring issue when people are employed remotely (perhaps in other countries) with no intermediary holding the employer accountable to honest payments. Some examples of this are remote software development, consulting, remote counseling, etc.
 
## What it does
Our project compensates employees in real time for their work. Using our web app, employees get paid by the second, meaning they can see their bank account steadily rising throughout a day of work as money streams in every tick. Due to the high overhead of online financial transactions, streaming small payments in real time like this has not been feasible. However, thanks to the micro-payment infrastructure of Ripple, it is now feasible to send the equivalent of pennies (or fractions of them) in seconds. Our web app utilizes this technology to enable employers to pay employees through a stream of ripple micropayments, often totaling only a few cents at a time.
 
The experience starts with the employer connecting a company Ripple account and entering the email of an employee into the system along with their hourly wage. Then, the employee hits a button on the employee portal of the site to “sign in.” So long as the employee is “signed in”, they get the equivalent of their secondly wage in Ripple deposited in real time into their account (which of course must be connected to their profile on our site).
 
## How we built it

We used Wix for the front end, Wix database for the storage and Wix backend for some api calls. We created a separate node.js server to service the interface with Ripple and the interledger. The node server has an exposed web api called by the Wix backend to facilitate payments and retrieve user account balances. We use a test network for our Ripple interface for a better demo and testing experience. Although we considered some third party interfaces to help  interface with the interledger (such as Coil), we decided to tackle that part of the project with raw javascript and plugins as specified directly by the ILP. We used a variety of Wix features, including drag-and-drop, debug, database, backend, external custom api calls, fetch and backend libraries, and numerous custom elements such as buttons, text elements and more.
 
## Challenges we ran into
-Integrating Wix with our server’s api
-Rapidly learning how to use the tools we integrated (but in a fun way)
-Learning how to interface with the interledger
-Running out of/managing our time
 
## Accomplishments that we're proud of
Thanks to Wix and its new Wix Code development environment, it was possible to create an infinitely scalable website in the fraction of the time it would have taken to make it through hard coding everything. With the Data Collections and Dynamic Webpages, a company of 100,000 employees can have a unique profile for each and every one of its employees and all of this is done by simply linking the data set to a dynamic site.

The ease of use of the Wix platform also allowed us to quickly drag and drop images, text boxes, links, buttons, and many more with the added ability of customizing these to the needs of the website.
 
## What we learned
A LOT of Javascript
How to use Ripple test nets and the interledger
Wix Code


## What's next for Timeless
This is just the beginning for the Timeless Platform! Future updates to Timeless will make the process of getting paid even easier, with automatic location tracking to start getting paid as soon as you step through the office door, smartwatch support for accessing your current balance on the fly, and additional features to improve payroll in the workplace or in contracting situations. We would also like to integrate multiple currencies, which is enabled by the interledger. This cross-currency integration would enable Timeless to become a powerful tool for remote, cross-boarder services such as consulting, online counseling, or even software development.

Best, 

Jeffrey, Prakrit and Norman
