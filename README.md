INSTALLATION

To install and run the test task you need to have installed NODE(LTS).

1) go to folder FRONTEND
2) run npm install
3) run npm start
4) open new terminal window
5) go to folder BACKEND
6) run npm install
7) run npm start

In the end you should have two terminals with angular and nest apps
Go to browser localhost:4200 to check the app
 USERNAME: bob
 PASSWORD: bob


TASK DESCRIPTION AND COMMENTS

The user, after authorization, sees the same page, but in the corner of the site (in any corner 00:00:00) he is shown a timer for his stay on the site
After five minutes of being on the site, he should get a modal window that blocks the entire interface for one minute and he cannot use anything

1) You can use NgRx, or any other state manager.
2) This should work no matter how many pages we add to the project.
3) When a user reloads the page, the timer should continue from where it stopped.
4) How would you do it if it needs to be done on the server and the user is logged in from different devices? (the counter must be common for all devices)

=======

1) I am against using NgRxish libriries at all, and not only me, there are a few beacons of light in the Internet which have the similar thought :)
2) Done
3) Done
4) I'm not a backend developer but the first what comes to my mind is to have session or similar staff on backend side and check if user is logged in.
   After that start some kind of service/worker/thread with countdown function. 
   If you login from another device, backend checks if service is available and connect user to it.
   Something like that, I think it can be better soulution if I spend some time on this task (investigation).
