class LeekScriptItem {

}

class LSFunction extends LeekScriptItem {
	public id!: number
	public name!: string
	public category!: number
	public operations!: number
	public arguments_names!: string[]
	public arguments_types!: string[]
	public return_name!: string | null
	public return_type!: number
	public deprecated!: boolean
	public replacement!: number | null
	public optional!: boolean[]
}
export { LSFunction, LeekScriptItem }
