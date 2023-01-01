#!/bin/bash

#Useful scripts for check in an checkout.
git config --global alias.dd "branch -d develop"
git config --global alias.db "branch develop"
git config --global alias.dc "checkout develop"

#Run with source ~/.bash_aliases
echo "alias rdevelop='git checkout master && git pull && git dd && git db && git dc'" >> ~/.bash_aliases
