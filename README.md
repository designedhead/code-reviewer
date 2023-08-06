
# @raff_mendes/code-reviewer

#### Description
An AI code reviewer designed to help you improve your code quality. It leverages OpenAI's language model to review staged code as a senior software engineer would. The package can be run using the command `npx @raff_mendes/code-reviewer`


#### Installation
You can run the code reviewer by installing it globally using npm:

`npm install -g @raff_mendes/code-reviewer`

Alternatively, you can use npx to run it without installing globally:

`npx @raff_mendes/code-reviewer`

#### Usage
When you run @raff_mendes/code-reviewer, it will prompt you to provide the following information:

- **Your OpenAI API key**: The code reviewer needs this key to access OpenAI's language model.
- **Max tokens**: The maximum number of tokens to use for each code review request to the language model. This determines the length of the review output and also limits the cost.
- **File types to check**: Specify the types of files you want to review. The code reviewer will check any staged files with these file extensions.
After providing the necessary information, the code reviewer will analyze your code and provide feedback as a senior software engineer would.

#### Options
You can run any of these as a flag, ie: `npx @raff_mendes/code-reviewer --edit`
`--edit`: Use this option to edit the configuration file manually. It will prompt you for the necessary information and store it in a config file.
`--clear`: Use this option to clear the existing configuration file if you want to start fresh.

#### Configuration
The configuration for the code reviewer is stored in a config file at the root of your project. The format of the file is as follows:

`{
api_key:"sk-123",
max_tokens:500,
file_types:[".js",".jsx",".ts",".tsx"]
}`

#### License
This package is distributed under the MIT License.

#### Contributing
Contributions to this project are welcome. If you find any issues or have suggestions for improvement, please open an issue or submit a pull request on the GitHub repository.

#### Credits
The code reviewer is developed and maintained by [Your Name] and contributors. Special thanks to OpenAI for providing the language model that powers the code reviewer.

#### Contact
For any inquiries or feedback, please contact mrrafaelmendes@gmail.com

Happy coding!




 