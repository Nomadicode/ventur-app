<template>
    <div class="user-header">
      <div class='uh-img'>
        <img :src="avatar" />
      </div>
      <div class="uh-details">
        <h4>{{ fullName }}</h4>
        <span class="uh-location">{{ address }}</span>
      </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import NodeGeocoder from 'node-geocoder'
import DefaultAvatarImage from '@/assets/avatar.png'

export default {
    name: 'UserHeader',
    created () {
        this.geocoder = NodeGeocoder({
            provider: 'google',
            apiKey: 'AIzaSyBFPkF998a0PltBrEP6D7aNl_Cp4XTsXxM'
        })

        this.getLocation()
    },
    data () {
        return {
            geocoder: null,
            address: null,
            latitude: null,
            longitude: null
        }
    },
    computed: {
        ...mapGetters('UserModule', ['fullName', 'profilePicture']),

        avatar () {
            return (this.profilePicture) ? this.profilePicture : DefaultAvatarImage
        }
    },
    methods: {
        getAddress () {
            var self = this
            this.geocoder.reverse({lat: this.latitude, lon: this.longitude}, function(err, res) {
                var response = res[0]
                self.address = response.city + ', ' + response.administrativeLevels.level1short + ' ' + response.countryCode
            })
        },
        getLocation () {
            if (navigator.geolocation) {
                var self = this
                navigator.geolocation.getCurrentPosition(function(position) {
                    self.latitude = position.coords.latitude
                    self.longitude = position.coords.longitude
                    self.getAddress()
                });
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.user-header {
    width: calc(100vw - 40px);
    margin: 20px auto 10px;
    position: relative;

    .uh-img {
        display: inline-block;
        width: calc(30% - 15px);
        margin-right: 15px;

        img {
            width: 100%;
        }
    }

    .uh-details {
        display: inline-block;
        vertical-align: top;
        width: 65%;
        font-size: 22px;
        margin-top: 4px;

        .uh-location {
            font-style: italic;
            font-size: 14px;
            font-weight: light;
        }
    }
}
</style>
