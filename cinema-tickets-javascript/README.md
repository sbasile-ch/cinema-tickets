# TicketService

## Specs

See the [Specs](https://github.com/sbasile-ch/cinema-tickets/blob/5ddd66f244528616720423d608a76730764e72de/cinema-tickets-javascript/specs/README.md) for the Javascript implementation.

## Implementation

Implemtation introduce with PR https://github.com/sbasile-ch/cinema-tickets/pull/1

## Usage:
```console
❯ node run.js <<< '4444, A:1 , C:2,A:2,I:8, A:2,A:6,A:1'           # for 1 entry

❯ echo '4444, A:1 , C:2,A:2,I:8, A:2,A:6,A:1' | node run.js        # for 1 entry

❯ cat ticketRequests.txt | node run.js                             # from a file

```
Refer to [this example file](https://github.com/sbasile-ch/cinema-tickets/blob/5ddd66f244528616720423d608a76730764e72de/cinema-tickets-javascript/src/ticketRequests.txt) for the syntax expected as input (also highlighted in the following snapshot)

![CLI](https://github.com/sbasile-ch/cinema-tickets/blob/5ddd66f244528616720423d608a76730764e72de/cinema-tickets-javascript/images/run-cli.png "CLI")

## Unit tests
The current Unit test coverage is only for `TicketService`

![Unit tests](https://github.com/sbasile-ch/cinema-tickets/blob/5ddd66f244528616720423d608a76730764e72de/cinema-tickets-javascript/images/run-test.png "Unit tests")
