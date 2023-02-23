export async function createUser(username, password, authKeyPair, authCertificate) {

    // generate local vault key from password
    let [ localVaultSalt, localVaultIV, localVaultKey ] = generateLocalVaultKey(password);
  
    // hash the password
    // DZ we should check if there is a better way to do this.
    let md = forge.md.sha256.create();
    md.update(localVaultSalt)
    md.update(password);
    const hash = md.digest().toHex();
  
    // create a user structure
    const user = {
      username: username,
      hash: hash,
      loggedIn: true,
      localVaultSalt: localVaultSalt,
      localVaultIV: localVaultIV,
    };
  
    // store user in the database
    await db.open();
    const primaryKey = await db.user.add(user);
    db.close();
    console.log("added user with primary key",primaryKey)
  
    // generate the IV and key for the remote vault
    const remoteVaultIV = forge.random.getBytesSync(16);
    const remoteVaultKey = forge.random.getBytesSync(16);
  
    // convert certificate from PEM format
    const certificate = forge.pki.certificateFromPem(authCertificate);
  
    // create local vault
    const vault = await createLocalVault(localVaultIV, localVaultKey, remoteVaultIV, remoteVaultKey, authKeyPair, certificate);
  
    // put the unencrypted vault into the store
    store.setLocalVault(vault);
  
    printLocalVault(vault);
  }