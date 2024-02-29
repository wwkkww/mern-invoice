#!/usr/bin/env bash


# take total secounds as arg & display realtime countdown timer in terminal
countdown(){

  declare desc="A simple countdown."

  local seconds="${1}"

  # $d = current time is seconds + total secounds user entered 
  local d=$(($(date +%s) + "${seconds}"))

  # this loop continues as long as $d is greater or equal with current time in secounds (date +%s)
  while [ "$d" -ge `date +%s` ]; do
  
    # -ne disable newline character \n\r and enable interpretion backslah escape  \
    # substract current time from target time ($d) and convert to user readable format (+%H:%M:%S)
    echo -ne "$(date -u --date @$(($d - `date +%s`)) +%H:%M:%S)\r";

    # short belay to control update timer refresh rate
    sleep 0.1
  done

}