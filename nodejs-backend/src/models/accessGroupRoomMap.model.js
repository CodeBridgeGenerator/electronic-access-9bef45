
    module.exports = function (app) {
        const modelName = 'access_group_room_map';
        const mongooseClient = app.get('mongooseClient');
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            accessGroupID: { type: Schema.Types.ObjectId, ref: "access_groups" },
roomID: { type: Schema.Types.ObjectId, ref: "rooms" },
isGrantedAccess: { type: Boolean, required: false, default: false },

            
            createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
            updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true }
          },
          {
            timestamps: true
        });
      
       
        if (mongooseClient.modelNames().includes(modelName)) {
          mongooseClient.deleteModel(modelName);
        }
        return mongooseClient.model(modelName, schema);
        
      };