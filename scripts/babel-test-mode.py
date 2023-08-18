import os
import sys

cmd_arg = sys.argv[1]

babel_config = os.path.join(os.path.dirname(__file__), '..', 'babel.config.js')

with open(babel_config, 'r') as f:
    config = f.read()
alias_non_test_mode = "'@src': './src',"
alias_test_mode = "'@src': './src',"

if cmd_arg == 'on':
    config = config.replace(alias_non_test_mode, alias_test_mode)
if cmd_arg == 'off':
    config = config.replace(alias_test_mode, alias_non_test_mode)

with open(babel_config, 'w') as f:
    f.write(config)
