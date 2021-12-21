# Distributed File System (DFS) … via IPFS

```sh
brew install ipfs --cask
ipfs version

# [In a separate terminal]:
# prints the WebUI url, usually: http://127.0.0.1:5001/webui
ipfs daemon

# To see more info
ipfs id

# Prints the CID (content id)
# which is to be used in:
# https://gateway.ipfs.io/ipfs/__CID__
# DIR_PATH shall include all static files for your website, inner links should be relative (not starting with "/exampleFile.js", but "exampleFile.js")
# [Notes], at the time of this writing:
#   - The `add` cmd did not seem to be effective, used IPFS-Desktop/WebUI instead and worked
#   - Used DIR_PATH of `src/` resulted from `truffle unbox pet-shop`, after modifying one path/link from `/pets.json` to `pets.json`
ipfs add -r DIR_PATH

# Prints the IPNS_ID
# which is to be used in:
# https://gateway.ipfs.io/ipns/__IPNS_ID__
ipfs name publish CID

# Re-publish new content under the same url of IPNS_ID
# https://gateway.ipfs.io/ipns/__IPNS_ID__
ipfs add -r ANOTHER_OR_SAME_DIR_AFTER_CHANGES
ipfs name publish NEW_CID
```

### Ref and docs:

- https://docs.ipfs.io
