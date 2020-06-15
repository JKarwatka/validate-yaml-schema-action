# Github Action: Validate YAML Schema

A Github action for checking if YAML files comply with specified schema.

## Usage

To use the action simply create an `.yml` file in the `.github/workflows/` directory.

For example:

```
name: Validate YAML Schema

on: [push, pull_request]

jobs:
  build:

    runs-on: ubuntu-latest

    steps:
    # Important: This sets up your GITHUB_WORKSPACE environment variable
    - uses: actions/checkout@v2

    - name: Validate YAML Schema
      uses: ansible/ansible-lint-action@master
      with:
        files-to-validate: [
          {
            path: path/to/yaml/file/or/directory
            schema: path/to/yaml/schema
          }
        ]
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.


## Credits

This GitHub action has been created by [Jakub Karwatka](https://github.com/JKarwatka)