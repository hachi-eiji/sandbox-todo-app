#!/bin/bash

source /etc/profile.d/rbenv.sh

# 強引にpidファイルを消す
rm -f tmp/pids/*.pid
bundle exec rails s -b '0.0.0.0'
