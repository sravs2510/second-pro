<template lang="html">
	<div>
		<div class="page-header page-bar">
			<h1>{{ $t('title') }}</h1>
			<div class="tabs">
				<div class="tab action active" icon="account_balance" link="/bank">
					<v-icon>mdi-bank</v-icon>
					<span>{{ $t('main.bank') }}</span>
				</div>
				<router-link to="/market">
					<div class="tab action" image="icon/market.png" link="/market">
						<img src="/image/icon/market.png">
						<span>{{ $t('main.market') }}</span>
					</div>
				</router-link>
				<router-link to="/inventory">
					<div class="tab action" icon="mdi-treasure-chest" link="/inventory">
						<v-icon>mdi-treasure-chest</v-icon>
						<span>{{ $t('main.inventory') }}</span>
					</div>
				</router-link>
			</div>
		</div>
		<panel class="first last">
			<div class="bank-description center" v-html="$t('description')"></div>
			<loader v-if="!packs" />
			<div v-else class="packs">
				<div v-for="(pack, p) in packs" :key="pack.crystals" class="pack card">
					<img :src="'/image/bank/crystals_' + p + '.png'">
					<h2 v-html="$t('pack_of_n_crystals', [pack.crystals])"></h2>
					<div class="buy">
						<router-link v-for="(offer, o) in pack.offers" :key="offer.type" :to="'/bank/buy/' + p + '/' + o">
							<div v-ripple>
								<span class="price">{{ offer.price }}€</span>
								<img :src="'/image/bank/' + offer.type + '.png'">
							</div>
						</router-link>
					</div>
				</div>
			</div>
		</panel>
	</div>
</template>

<script lang="ts">
	import { mixins } from '@/model/i18n'
	import { LeekWars } from '@/model/leekwars'
	import { Component, Vue } from 'vue-property-decorator'

	@Component({ name: 'bank', i18n: {}, mixins: [...mixins] })
	export default class Bank extends Vue {
		packs: any = null
		created() {
			LeekWars.setActions([
				{image: 'icon/market.png', click: () => this.$router.push('/market')},
				{icon: 'mdi-treasure-chest', click: () => this.$router.push('/inventory')},
			])
			LeekWars.get('bank/get-packs').then(data => {
				this.packs = data.packs
				LeekWars.setTitle(this.$i18n.t('title'))
			})
			this.updateSubtitle()
		}
		updateSubtitle() {
			if (this.$store.state.farmer) {
				LeekWars.setSubTitle(this.$t('main.x_habs', [LeekWars.formatNumber(this.$store.state.farmer.habs)]) + " • " + this.$t('main.x_crystals', [LeekWars.formatNumber(this.$store.state.farmer.crystals)]))
			}
		}
	}
</script>

<style lang="scss" scoped>
	.bank-description {
		padding: 20px;
		font-size: 17px;
		text-align: justify;
		line-height: 26px;
		::v-deep .crystal {
			margin-bottom: -6px;
		}
	}
	#app.app .bank-description {
		padding: 5px 0;
	}
	.packs {
		display: grid;
		grid-gap: 10px;
		padding: 10px;
		grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
	}
	#app.app .packs {
		padding: 0;
		padding-top: 10px;
	}
	.pack {
		padding: 10px;
		min-height: 90px;
		h2 {
			margin-bottom: 8px;
			margin-top: 3px;
			font-size: 20px;
		}
	}
	.pack > img {
		float: left;
		margin-right: 15px;
		margin-left: 3px;
		height: 80px;
		width: 85px;
		margin-top: 5px;
		object-fit: contain;
	}
	.pack .buy {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
		div {
			border-radius: 2px;
			padding: 5px 10px;
			margin: 5px 0;
			display: inline-flex;
			border: 1px solid #aaa;
			border-radius: 4px;
			&:hover {
				background: #eee;
			}
		}
	}
	.pack .price {
		font-weight: 400;
		font-size: 25px;
		color: #777;
	}
	.pack .buy img {
		margin-left: 5px;
		vertical-align: middle;
		height: 30px;
	}
</style>