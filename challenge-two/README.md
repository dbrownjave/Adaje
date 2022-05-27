## Adajade - Challenge #1

#### Instructions

```sh
npm install
npm start
```

#### Description

Build an application that, on initialization makes a (mock) call out to a server that returns a random number between 1 and 900. As long as the number is even, the call should be made again but with an increasing delay between calls.
Upon receipt of an odd number, the app should set the color of a button as follows:

• Green if the number is in the interval [1,300)
• Red if the number is in the interval [300,600)
• Blue if the number is in the interval [600,900]

When the button is clicked, the following should happen:
• A string (the current color of the button) should be added to a list (displayed below the
button).

• A call should be made to the same mock endpoint to reset the color of the button based
on the logic above
