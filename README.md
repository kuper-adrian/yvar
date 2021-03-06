# yvar - replace placeholders in files

yvar is a tiny command-line tool that replaces placeholders, that look like `$_{ FOO }`, with some other value. For example, look at this `example.yml` file:
```yaml
example:
  answer: $_{ ANSWER }
```

Now run yvar:
```
yvar example.yml example.out.yml --ANSWER 42
```

The result will be the following file named `example.out.yml`:
```yaml
example:
  answer: 42
```

yvar should work with all kinds of text files, e.g. `json`.

I'm not to sure if this tool has any real-world use cases, but I personally use it in my continuous deployment setup to create environment specific `docker-compose.override.yml` files during builds.

Also if you have bugs or improvements, feel free to open an issue on GitHub.

## Install

```
npm install yvar
```
or if you want to use it globally with the `yvar` command
```
npm install -g yvar
```

## Use

Any yvar command has to following structure:
```
yvar INPUT_FILE OUTPUT_FILE [VARS]
```
* `INPUT_FILE`: path to file that contains placeholders
* `OUTPUT_FILE`: path of file that holds result
* `[VARS]`: List all placeholders with their replacement using `--`. I.e. if you want to replace `$_{ FOO }` with "bar", append `--FOO bar` to the command

## License

MIT