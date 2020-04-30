# ab.js – log

Just for fun... A really "direct" port of PHP's de-facto standard PSR-3 logging interface to Typescript.

## Fun Stuff

 - No traits needed like in PHP.  Can do away with `LoggerTrait` and `LoggerAwareTrait` (although never used anyway).
 - Can potentially overload `context` -- either that, or expand out the "logContext" type -- allow rejected promises, 
 `Error` objects, and the like.  Then, convert them to a useful string for the implementations (i.e, provide a util).
 - Likewise with `message` itself.  Allow passing `string | Error | RejectedPromise ...` ... or anything with a "msg" property, etc...
 - Functional Logging? `logger.on('alert',....)`.

## Quick overview (my own ref)

Each `syslog` "priority" is implemented as it's own method, + an additional method `log()` which accepts the "priority" or "level" **as a string as the first argument**.  This is the entirety of the Interface:

| Method Signature / API for `LoggerInterface`, `AbstractLogger`, and all implementations | Description per RFC                                   | `LogLevel` Member    |
| ------------------------------------------------------------ | ----------------------------------------------------- | -------------------- |
| `mylog.emergency(message, context);`                      | Emergency: system is unusable (LOG_EMERG)             | `LogLevel.EMERGENCY` |
| `mylog.alert(message, context)`                           | Alert: action must be taken immediately (LOG_ALERT)   | `LogLevel.ALERT`     |
| `mylog.critical(message, context)`                        | Critical: critical conditions (LOG_CRIT)              | `LogLevel.CRITICAL`  |
| `mylog.error(message, context)`                           | Error: error conditions (LOG_ERR)                     | `LogLevel.ERROR`     |
| `mylog.warning(message, context)`                         | Warning: warning conditions (LOG_WARNING)             | `LogLevel.WARNING`   |
| `mylog.notice(message, context)`                          | Notice: normal but significant condition (LOG_NOTICE) | `LogLevel.NOTICE`    |
| `mylog.info(message, context)`                            | Informational: informational messages (LOG_INFO)      | `LogLevel.INFO`      |
| `mylog.debug(message, context)`                           | Debug: debug-level messages (LOG_DEBUG)               | `LogLevel.DEBUG`     |
| `mylog.log(level, message, context)` <br /> ... (*note the additional arg*) | *(not in rfc, unique to psr/log's implementation)*    | —                    |

# level, message, context

Right now these aren't doing anything fancy, and are not taking any special advantage of Typescript.

 - `level` is type-aliased to `logLevel` which is just `string`  
 - `context` is type-aliased to `logContext` which is just `Map<string, any> | Array`.
 - `message` is type-aliased to `logMessage` which is simply `string` (nothing fancy).

## Example

```typescript
class MyService {
  constructor(MyDatabase: dbClass, serviceLogger: LoggerInterface) {   
    this.logger = serviceLogger;
 }

  doStuff() { 
    this.logger.info("I have good taste in logger libraries!"); // and that's it!
  }
}
```

## Full Class List (from PHP)

Test classes are not included here.

- `LoggerInterface` – Where everything starts.  This is an interface with one method for each of the seven 'levels' (emergency, alert, debug, etc) which each have two parameters `(msg, context)`, and an eighth method interface which has three, `(level, msg, context)`. 
  - `AbstractLogger` – An implementor of `LoggerInterface`, it defines all seven "level" methods (`emergency()`, etc) which all call a single abstract method, `log()`.  This is meant to reduce boilerplate.  By extending `AbstractLogger`, you only need to write a single method to write a logger implementation.
    - `NullLogger` – A child of `AbstractLogger`, it implements the most basic Logger possible: one that does nothing and log messages simple are a no-op.
  - `LoggerTrait` – Exactly the same as `AbstractLogger`, but implemented as a standalone trait for "classes unable to extend `AbstractLogger`" .  It does not implement `LoggerInterface` and should only be used as a last resort.
- `LoggerAwareInterface` – Defines a single method, `setLogger(logger: LoggerInterface)`
- `LoggerAwareTrait` – Exactly the same as `LoggerAwareInterface`, but as a trait (which aren't in Typescript, so these are up in the air).  It does not implement `LoggerAwareTrait` and should be used as a last resort.
- `InvalidArgumentException` - An exception class for invalid arguments.  Probably should `extend` the `Error` class in Typescript.  Note that no code within this library actually `throw`'s this exception: it is there for you to use.
- `LogLevel` – A class with no logic, only containing seven constants / members, one for each log level (or 'priority').  For example, `LogLevel.EMERGENCY` (`LogLevel::EMERGENCY` in PHP) is the string "emergency", and `LogLevel.DEBUG` is the string "debug".  This is intentionally not implemented as an `enum` in Typescript for extensibility and simplicity.

## Further Reading / Information

- [The official PSR-3 standard on PHP-FIG website](https://www.php-fig.org/psr/psr-3/) - [The Psr\Log Git Repository](https://github.com/php-fig/log) - [psr/log on packagist](https://packagist.org/packages/psr/log)
- [The BSD syslog Protocol: RFC 3164](https://tools.ietf.org/html/rfc3164) … and especially [Section 4.1.1: The PRI Part](https://tools.ietf.org/html/rfc3164#section-4.1.1).
- [The Syslog Protocol: Follow-up RFC 5424](https://tools.ietf.org/html/rfc5424).
- [OpenBSD syslog(3) Manual Page](https://man.openbsd.org/man3/syslog.3) and [NetBSD syslog(3) Manual Page](https://netbsd.gw.com/cgi-bin/man-cgi?syslog+3+NetBSD-current) which give the following more detailed original meanings to the syslog pri levels:
  - `LOG_EMERG`:  A panic condition.  This is normally broadcast to all users.
  - `LOG_ALERT`: A condition that should be corrected immediately, such as a corrupted system database.
  - `LOG_CRIT`: Critical conditions, e.g., hard device errors.
  - `LOG_NOTICE`: Conditions that are not error conditions, but should possibly be handled specially.
  - `LOG_DEBUG`: Messages that contain information normally of use only when debugging a program.
- The above constants (`LOG_EMERG`) are `'#define`'d in `sys/syslog.h`.  The actual values in syslog are integers, from 0 (LOG_EMERG) to 7 (LOG_DEBUG). 

## Copyright

The original PHP library, and some PHP code still within this repository is
> (C) Copyright 2012 [PHP Framework Interoperability Group](https://php-fig.org), and has been made available by them under the MIT license.
