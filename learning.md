# Learnings

## React 16
1. useState array update hooks with setXYZ([...oldArray, newValue]);. Must include [].
2. useState object update hooks with setXYZ({...OldObj, newKey: value}). Must remember to include {} in the brackets.
3. If the hook update is in another method, we need to use as method to get the latest array. E.g setXYZ(oldArray => [...oldArray, newValue]), setXYZ(oldObject => {return {...oldObject, ...newObject}}).
