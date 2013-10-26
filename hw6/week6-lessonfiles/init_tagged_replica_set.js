

config = { _id: "rs1", members:[
    { _id : 0, host : "Andrews-iMac.local:27017", tags: {'loc':'NY'}},
    { _id : 1, host : "Andrews-iMac.local:27018", tags: {'loc':'NY'}},
    { _id : 2, host : "Andrews-iMac.local:27019", tags: {'loc':'CA'}}],

    'settings': {
	getLastErrorModes : {
	    "disasterProof" : {"loc" : 2}
	}
    }
}

//rs.initiate(config)
rs.reconfig(config)
rs.status()
