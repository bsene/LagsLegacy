# TASKS

At LAGS (Louez votre Avion et Gagnez des Sous), we have an airplane that we offer to air companies for renting.

Mr. Robinson, the CEO of our company, uses a special program that was made for him a long time ago to predict the company's revenue for a specific list of orders.
This program used to work perfectly well until last week when we learned that some change had been made in the input file format, and that an adaptation has to be made.

Unfortunately, the author of the original program is no longer with us, as he retired some 15 years ago. So Mr. Robinson asked his nephew David, who is currently an intern at the company, to see if he could change the program and make it work with the new order file format.

His nephew said that repairing the program was hopeless, as it was too badly designed, but he proposed to do a rewrite. 

That's his program you have on the repository.

Where's David you ask? Hmm I think he's on vacation with his uncle. For all I know they are probably sailing somewhere between Ionan Sea and Corsica, not sure.

Do we have the original program? Ah there's a problem with that: David says he deleted it. That was the day before they left for their vacation trip..

## 1) Explain what the code does

We think that Mr. Robinson's nephew being away, now is a good time for looking at the program and see if we can document it. It's important after all. Also we think that having some tests would be good. David thinks otherwise, but we are sure he will be pleased to have them when he's back.

## 2) Can you fix a bug?

The initial program, given the `ORDERS.TXT`, would output _15801153_, which is known to be the correct result for that set of orders.

The current program, given the same file, outputs _15801048_. It's not a big difference, but still.

Given another set of orders, like the one in the file `SMALL.TXT`, though, both programs output the same result, so there is hope.

## 3) Please make the program run faster

Not sure if you will notice it, but David's program happens to be awfully slow. Several dozens of seconds to compute 30000 orders is unacceptable. The initial program was blazingly fast, but then again it was impossible to adapt it to the new format, so what do I know.

Should we expect larger sets of orders in the future ? I don't think so. The business is a bit on the decline, sadly. Thirty thousands orders is quite the maximum.

## 4) We need a new feature

Mr. Robinson likes this program well, but he would really enjoy being able to know not only the total revenue that can be predicted for a set of orders, but also which of them contribute to the revenue.  Mr. Robinson gave me an example where he used a small set of orders -- I believe they are in the file named `SAMPLE.TXT`:

Given the orders:

- `FOO` from 0 to 10 at price 100, 
- `BAR` from 3 to 12 at price 140,
- `QUX` from 10 to 15 at price 70,
- `BAZ` from 11 to 17 at price 80

not only the program should output `180` -- the correct revenue from such a set -- but also the orders to accept. Something like this:

- take order `FOO` for 100
- take order `BAZ` for 80
- total : 180
 

