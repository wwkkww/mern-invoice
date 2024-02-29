#!/usr/bin/env bash

yes_no(){
  declare desc="Prompt for confirmattion \$\"\{1\}\": confirmation message"

  local arg1="${1}"

  # -r prevent \ escapes from being interpreted
  # -p flag follow by prompt message
  local response= read -r -p "${arg1} (y/[n])? " response

  # check user response is Y or y
  if [[ "${response}" =~ ^[Yy]$ ]]

  then
    # exits with success status of 0
    exit 0
  else
    # exits with failure status of 1
    exit 1
  fi
}